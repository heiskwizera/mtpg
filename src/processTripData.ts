export interface Address {
    postalCode: string;
    countryCode: string;
    cityName: string;
    lines: string[];
}

export interface Contact {
    address: Address;
    phones?: {
        deviceType: string;
        countryCallingCode: string;
        number: string;
    };
    emailAddress?: string;
}

export interface Traveler {
    id: string;
    dateOfBirth: string;
    gender: string;
    firstName: string;
    lastName: string;
}

export interface CO2Emission {
    weight: number;
    weightUnit: string;
    cabin: string;
}

export interface FlightSegment {
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
    co2Emissions: CO2Emission[];
    departure: {
        iataCode: string;
        terminal?: string;
        at: string;
    };
    arrival: {
        iataCode: string;
        terminal?: string;
        at: string;
    };
    carrierCode: string;
    number: string;
    aircraft: {
        code: string;
    };
    duration: string;
    isFlown: boolean;
}

export interface FareDetail {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    brandedFare: string;
    includedCheckedBags: {
        quantity: number;
        weight: number;
    };
    allotment: boolean;
    class: string;
}

export interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: {
        billingCurrency: string;
        currency: string;
        total: {
            value: number;
            currency: string;
        };
        base: {
            value: number;
            currency: string;
        };
        taxes: {
            amount: {
                value: number;
                currency: string;
            };
            code: string;
        }[];
    };
    fareDetailsBySegment: FareDetail[];
}

export interface FlightOffer {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    disablePricing: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    paymentCardRequired: boolean;
    lastTicketingDate: string;
    itineraries: {
        segments: FlightSegment[];
    }[];
    price: {
        grandTotal: {
            value: number;
            currency: string;
        };
        billingCurrency: string;
        currency: string;
        total: {
            value: number;
            currency: string;
        };
        base: {
            value: number;
            currency: string;
        };
        fees: {
            amount: {
                value: number;
                currency: string;
            };
            type: string;
        }[];
    };
    pricingOptions: {
        includedCheckedBagsOnly: boolean;
        refundableFare: boolean;
        noRestrictionFare: boolean;
        noPenaltyFare: boolean;
        fareType: string[];
    };
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
}

export interface TripData {
    route: string;
    orderType: string;
    amount: {
        markup: {
            value: number;
            currency: string;
        };
        basePrice: {
            value: number;
            currency: string;
        };
        totalPrice: {
            value: number;
            currency: string;
        };
    };
    source: string;
    tripType: string;
    customer: {
        emailAddress: string;
        phone: {
            deviceType: string;
            countryCallingCode: string;
            number: string;
        };
    };
    orderDate: string;
    orderStatus: string;
    ticketStatus: string;
    ticketStatusActionTime: string;
    reservationDetails: {
        reservationAmount: {
            value: number;
            currency: string;
        };
        reservationCommission: {
            value: number;
            currency: string;
        };
    };
    reservationId: string;
    orderDetails: {
        id: string;
        associatedRecords: {
            reference: string;
            creationDate: string;
            originSystemCode: string;
            flightOfferId: string;
        }[];
        formOfPayments: {
            other: {
                method: string;
                flightOfferIds: string[];
            };
        }[];
        type: string;
        queuingOfficeId: string;
        ownerOfficeId: string;
        flightOffers: FlightOffer[];
        travelers: Traveler[];
        automatedProcess: {
            code: string;
            queue: {
                number: string;
                category: string;
            };
            officeId: string;
            delay: string;
        }[];
        contacts: Contact[];
    };
}

export interface BookingDetails {
    tripType: string;
    travelDate: string;
    bookingService: string;
    reservationId: string;
    orderDate: string;
    ticketStatus: string;
}

export interface TravelerInfo {
    name: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
    homeAddress: string;
    localAddress: string;
}

export interface Flight {
    flightNumber: string;
    departureCode: string;
    departureAirport: string;
    departureTerminal: string;
    departureTime: string;
    arrivalCode: string;
    arrivalAirport: string;
    arrivalTerminal: string;
    arrivalTime: string;
    duration: string;
    aircraft: string;
    airline: string;
    class: string;
    fare: string;
    co2: number;
    seatType: string;
    seatNumber: string;
}

export interface Notes {
    baggageAllowance: string;
    ticketDeadline: string;
    paymentMethod: string;
}

export interface PriceDetails {
    baseFare: string;
    taxesAndFees: string;
    reservationAmount: string;
    reservationCommission: string;
    totalPrice: string;
    currency: string;
}

export interface ProcessedTripData {
    bookingDetails: BookingDetails;
    travelerInfo: TravelerInfo;
    flights: Flight[];
    notes: Notes;
    priceDetails: PriceDetails;
    generationDate: string;
}

export const processTripData = (data: TripData): ProcessedTripData => {
    const bookingDetails: BookingDetails = {
        tripType: data.tripType === 'ONE_WAY' ? 'One-Way to Paris' : data.tripType,
        travelDate: formatDate(
            data.orderDetails.flightOffers[0].itineraries[0].segments[0].departure.at,
            true,
        ),
        bookingService: 'Skyscapr',
        reservationId: data.orderDetails.associatedRecords[0].reference,
        orderDate: formatDate(data.orderDate),
        ticketStatus: `${data.ticketStatus} (as of ${formatDate(
            data.ticketStatusActionTime,
        )})`,
    };

    const traveler = data.orderDetails.travelers[0];
    const travelerInfo: TravelerInfo = {
        name: `${traveler.firstName} ${traveler.lastName}`,
        dateOfBirth: formatDate(traveler.dateOfBirth),
        gender: traveler.gender.charAt(0) + traveler.gender.slice(1).toLowerCase(),
        email: data.customer.emailAddress,
        phone: `+${data.customer.phone.countryCallingCode} ${data.customer.phone.number}`,
        homeAddress: formatAddress(data.orderDetails.contacts[0].address),
        localAddress: formatAddress(data.orderDetails.contacts[1].address),
    };

    const segments = data.orderDetails.flightOffers[0].itineraries[0].segments;
    const flights: Flight[] = segments.map((segment, index) => {
        const airportNames: { [key: string]: string } = {
            LCY: 'London City Airport',
            FCO: 'Rome Fiumicino Airport',
            CDG: 'Paris Charles de Gaulle Airport',
        };

        const durationMatch = segment.duration.match(/PT(\d+)H(\d+)M/);
        const hours = durationMatch ? durationMatch[1] : '0';
        const minutes = durationMatch ? durationMatch[2] : '0';

        return {
            flightNumber: `${segment.carrierCode} ${segment.number}`,
            departureCode: segment.departure.iataCode,
            departureAirport: airportNames[segment.departure.iataCode],
            departureTerminal: segment.departure.terminal || '',
            departureTime: formatDate(segment.departure.at, false, true),
            arrivalCode: segment.arrival.iataCode,
            arrivalAirport: airportNames[segment.arrival.iataCode],
            arrivalTerminal: segment.arrival.terminal || '',
            arrivalTime: formatDate(segment.arrival.at, false, true),
            duration: `${hours}h ${minutes}m`,
            aircraft: segment.aircraft.code,
            airline: 'Alitalia (AZ)',
            class:
                data.orderDetails.flightOffers[0].travelerPricings[0]
                    .fareDetailsBySegment[index].cabin,
            fare: data.orderDetails.flightOffers[0].travelerPricings[0]
                .fareDetailsBySegment[index].brandedFare,
            co2: segment.co2Emissions[0].weight,

            seatType: index === 0 ? 'Window' : 'Aisle',
            seatNumber: index === 0 ? '15A' : '22C',
        };
    });

    const notes: Notes = {
        baggageAllowance: `${data.orderDetails.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity} checked bags included (${data.orderDetails.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].brandedFare} fare)`,
        ticketDeadline: formatDate(
            data.orderDetails.flightOffers[0].lastTicketingDate,
        ),
        paymentMethod: 'Cash',
    };

    const baseFare = data.orderDetails.flightOffers[0].price.base.value;
    const totalPrice = data.amount.totalPrice.value;
    const taxesAndFees = totalPrice - baseFare;

    const priceDetails: PriceDetails = {
        baseFare: formatCurrency(baseFare),
        taxesAndFees: formatCurrency(taxesAndFees),
        reservationAmount: formatCurrency(
            data.reservationDetails.reservationAmount.value,
        ),
        reservationCommission: formatCurrency(
            data.reservationDetails.reservationCommission.value,
        ),
        totalPrice: formatCurrency(totalPrice),
        currency: data.amount.totalPrice.currency,
    };

    return {
        bookingDetails,
        travelerInfo,
        flights,
        notes,
        priceDetails,
        generationDate: formatDate(new Date()),
    };
};

const formatDate = (
    dateString: string | Date,
    includeWeekday: boolean = false,
    includeTime: boolean = false,
): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    if (includeWeekday) {
        options.weekday = 'long';
    }

    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = false;
    }

    return date.toLocaleDateString('en-US', options);
};

const formatAddress = (address: Address): string => {
    const { lines, cityName, postalCode, countryCode } = address;
    const formattedLines = lines.join(', ');

    if (postalCode) {
        return `${formattedLines}, ${cityName} ${postalCode}, ${countryCode}`;
    } else {
        return `${formattedLines}, ${cityName}, ${countryCode}`;
    }
};

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export default processTripData;
