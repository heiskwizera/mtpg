
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Platform,
    Alert
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import FileViewer from 'react-native-file-viewer';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import processTripData, { TripData } from './processTripData';
import generateTripHTML from './generateTripHTML';

interface TripPDFGeneratorProps {
    tripData: TripData;
    onComplete?: (filePath: string) => void;
}


const TripPDFGenerator: React.FC<TripPDFGeneratorProps> = ({ tripData, onComplete }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [pdfPath, setPdfPath] = useState<string | null>(null);

    const generatePDF = async (): Promise<void> => {
        try {
            setLoading(true);

            const processedData = processTripData(tripData);

            const htmlContent = generateTripHTML(processedData);


            const options = {
                html: htmlContent,
                fileName: `Trip_${processedData.bookingDetails.reservationId}`,
                directory: 'Documents',
                height: 842,
                width: 595,
                padding: 0,
                base64: false,
                bgColor: "#ffffff",

                marginLeft: 0,
                marginRight: 0,
                marginTop: '15mm',
                marginBottom: 0,

                customOptions: Platform.OS === 'android' ? {
                    colorMode: 'color',
                    printQuality: 'high',
                    paperSize: 'A4',
                    usePrintMediaSize: true,
                    dpi: '300',
                    renderingMode: 'rgb',
                    overrideScaleFactor: '1.0',


                    paperTopMargin: '15',
                    paperLeftMargin: '0',
                    paperRightMargin: '0',
                    paperBottomMargin: '0',
                    fitPolicy: 'NO_SCALING',
                    enableCssPageSize: true,
                } : {
                    preferredPaperSize: 'A4',
                    preferredPaperOrientation: 'portrait',
                    topMargin: '15mm',
                    printPageMargins: true
                }
            };

            if (Platform.OS === 'android') {
                const storagePermission = await checkPermission();
                if (!storagePermission) {
                    setLoading(false);
                    Alert.alert('Permission denied', 'Storage permission is required to save the PDF.');
                    return;
                }
            }

            const pdf = await RNHTMLtoPDF.convert(options);

            if (pdf.filePath) {
                setPdfPath(pdf.filePath);

                if (onComplete) {
                    onComplete(pdf.filePath);
                }

                await FileViewer.open(pdf.filePath, { showOpenWithDialog: true });
            } else {
                throw new Error('Failed to generate PDF: No file path returned');
            }

        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Error', 'Failed to generate the PDF. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const checkPermission = async (): Promise<boolean> => {
        try {

            const permission = Platform.OS === 'android'
                ? Platform.Version >= 33
                    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                    : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
                : PERMISSIONS.IOS.PHOTO_LIBRARY;

            const permissionStatus = await check(permission);

            if (permissionStatus === RESULTS.GRANTED) {
                return true;
            }

            const requestResult = await request(permission);
            return requestResult === RESULTS.GRANTED;

        } catch (error) {
            console.error('Error checking permission:', error);
            return false;
        }
    };

    const sharePDF = async (): Promise<void> => {
        if (!pdfPath) {
            Alert.alert('No PDF', 'Please generate the PDF first.');
            return;
        }

        try {
            const shareOptions = {
                title: 'Share Trip Details',
                url: `file://${pdfPath}`,
                type: 'application/pdf',
                subject: `Trip Details - ${tripData?.reservationId || 'Reservation'
                    }`
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing PDF:', error);
            Alert.alert('Error', 'Failed to share the PDF.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={generatePDF}
                disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Generate Trip PDF</Text>
                )}
            </TouchableOpacity>

            {pdfPath && (
                <TouchableOpacity style={styles.shareButton} onPress={sharePDF}>
                    <Text style={styles.buttonText}>Share PDF</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#2a3352',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 10
    },
    shareButton: {
        backgroundColor: '#0066cc',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default TripPDFGenerator;