import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar
} from 'react-native';

import TripPDFGenerator from './src/tripPDFGenerator';
import sampleTripData from './src/sampleTripData';

const App: React.FC = () => {
  const [generatedPdfPath, setGeneratedPdfPath] = useState<string | null>(null);

  const handlePdfComplete = (filePath: string): void => {
    setGeneratedPdfPath(filePath);
    console.log('PDF generated at:', filePath);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>MyTrip PDF Generator</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Generates an A4-sized PDF from your trip data.
          </Text>

          <TripPDFGenerator
            tripData={sampleTripData}
            onComplete={handlePdfComplete}
          />

          {generatedPdfPath && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>PDF generated successfully!</Text>
              <Text style={styles.resultPath}>{generatedPdfPath}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flexGrow: 1
  },
  header: {
    backgroundColor: '#2a3352',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  content: {
    padding: 16
  },
  description: {
    fontSize: 16,
    marginBottom: 14,
    lineHeight: 24,
    color: '#333333'
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#91d5ff'
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8
  },
  resultPath: {
    fontSize: 14,
    color: '#666666'
  }
});

export default App;