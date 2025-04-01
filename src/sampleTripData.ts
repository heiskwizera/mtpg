import { TripData } from './processTripData';

const sampleTripData: TripData = {
    route: 'Skyscapr booking for your trip to Paris on Thu 10 April 2025',
    orderType: 'RESERVATION',
    amount: {
        markup: {
            value: 0,
            currency: 'RWF',
        },
        basePrice: {
            value: 201576.15,
            currency: 'RWF',
        },
        totalPrice: {
            value: 201576.15,
            currency: 'RWF',
        },
    },
    source: '[GDS, PYTON, LTC, EAC]',
    tripType: 'ONE_WAY',
    customer: {
        emailAddress: 'ichristine180@gmail.com',
        phone: {
            deviceType: 'MOBILE',
            countryCallingCode: '49',
            number: '0780289113',
        },
    },
    orderDate: '2025-03-14T12:53:43.100Z',
    orderStatus: 'SUCCESS',
    ticketStatus: 'ISSUED',
    ticketStatusActionTime: '2025-03-25T08:33:19.727Z',
    reservationDetails: {
        reservationAmount: {
            value: 30000,
            currency: 'RWF',
        },
        reservationCommission: {
            value: 10000,
            currency: 'RWF',
        },
    },
    reservationId: 'c34347c2-13ab-4ff1-9371-21f5f8054eea',
    orderDetails: {
        id: 'eJzTd9cPd%2FbyCvECAAuCAnI%3D',
        associatedRecords: [
            {
                reference: 'WCJJTJ',
                creationDate: '2025-03-14T12:53:00.000',
                originSystemCode: 'GDS',
                flightOfferId: '1',
            },
        ],
        formOfPayments: [
            {
                other: {
                    method: 'CASH',
                    flightOfferIds: ['1'],
                },
            },
        ],
        type: 'flight-order',
        queuingOfficeId: 'BERL128EU',
        ownerOfficeId: 'BERL128EU',
        flightOffers: [
            {
                type: 'flight-offer',
                id: '1',
                source: 'GDS',
                instantTicketingRequired: false,
                disablePricing: false,
                nonHomogeneous: false,
                oneWay: false,
                paymentCardRequired: false,
                lastTicketingDate: '2025-04-03',
                itineraries: [
                    {
                        segments: [
                            {
                                id: '77',
                                numberOfStops: 0,
                                blacklistedInEU: false,
                                co2Emissions: [
                                    {
                                        weight: 117,
                                        weightUnit: 'KG',
                                        cabin: 'ECONOMY',
                                    },
                                ],
                                departure: {
                                    iataCode: 'LCY',
                                    at: '2025-04-10T16:50:00',
                                },
                                arrival: {
                                    iataCode: 'FCO',
                                    terminal: '3',
                                    at: '2025-04-10T20:20:00',
                                },
                                carrierCode: 'AZ',
                                number: '213',
                                aircraft: {
                                    code: '221',
                                },
                                duration: 'PT2H30M',
                                isFlown: false,
                            },
                            {
                                id: '78',
                                numberOfStops: 0,
                                blacklistedInEU: false,
                                co2Emissions: [
                                    {
                                        weight: 97,
                                        weightUnit: 'KG',
                                        cabin: 'ECONOMY',
                                    },
                                ],
                                departure: {
                                    iataCode: 'FCO',
                                    terminal: '1',
                                    at: '2025-04-10T21:30:00',
                                },
                                arrival: {
                                    iataCode: 'CDG',
                                    terminal: '2B',
                                    at: '2025-04-10T23:40:00',
                                },
                                carrierCode: 'AZ',
                                number: '332',
                                aircraft: {
                                    code: '32N',
                                },
                                duration: 'PT2H10M',
                                isFlown: false,
                            },

                        ],
                    },
                ],
                price: {
                    grandTotal: {
                        value: 195705,
                        currency: 'RWF',
                    },
                    billingCurrency: 'RWF',
                    currency: 'RWF',
                    total: {
                        value: 195705,
                        currency: 'RWF',
                    },
                    base: {
                        value: 33140,
                        currency: 'RWF',
                    },
                    fees: [
                        {
                            amount: {
                                value: 0,
                                currency: 'RWF',
                            },
                            type: 'TICKETING',
                        },
                        {
                            amount: {
                                value: 0,
                                currency: 'RWF',
                            },
                            type: 'SUPPLIER',
                        },
                        {
                            amount: {
                                value: 0,
                                currency: 'RWF',
                            },
                            type: 'FORM_OF_PAYMENT',
                        },
                    ],
                },
                pricingOptions: {
                    includedCheckedBagsOnly: false,
                    refundableFare: false,
                    noRestrictionFare: false,
                    noPenaltyFare: false,
                    fareType: ['PUBLISHED'],
                },
                validatingAirlineCodes: ['AZ'],
                travelerPricings: [
                    {
                        travelerId: '1',
                        fareOption: 'STANDARD',
                        travelerType: 'ADULT',
                        price: {
                            billingCurrency: 'RWF',
                            currency: 'RWF',
                            total: {
                                value: 195705,
                                currency: 'RWF',
                            },
                            base: {
                                value: 33140,
                                currency: 'RWF',
                            },
                            taxes: [
                                {
                                    amount: {
                                        value: 23930,
                                        currency: 'RWF',
                                    },
                                    code: 'GB',
                                },
                                {
                                    amount: {
                                        value: 11570,
                                        currency: 'RWF',
                                    },
                                    code: 'HB',
                                },
                                {
                                    amount: {
                                        value: 9455,
                                        currency: 'RWF',
                                    },
                                    code: 'IT',
                                },
                                {
                                    amount: {
                                        value: 1870,
                                        currency: 'RWF',
                                    },
                                    code: 'MJ',
                                },
                                {
                                    amount: {
                                        value: 58130,
                                        currency: 'RWF',
                                    },
                                    code: 'UB',
                                },
                                {
                                    amount: {
                                        value: 5170,
                                        currency: 'RWF',
                                    },
                                    code: 'VT',
                                },
                                {
                                    amount: {
                                        value: 32390,
                                        currency: 'RWF',
                                    },
                                    code: 'YQ',
                                },
                                {
                                    amount: {
                                        value: 20050,
                                        currency: 'RWF',
                                    },
                                    code: 'YR',
                                },
                            ],
                        },
                        fareDetailsBySegment: [
                            {
                                segmentId: '77',
                                cabin: 'ECONOMY',
                                fareBasis: 'OOLGEU1',
                                brandedFare: 'ECOLIGHT',
                                includedCheckedBags: {
                                    quantity: 0,
                                    weight: 0,
                                },
                                allotment: false,
                                class: 'O',
                            },
                            {
                                segmentId: '78',
                                cabin: 'ECONOMY',
                                fareBasis: 'OOLGEU1',
                                brandedFare: 'ECOLIGHT',
                                includedCheckedBags: {
                                    quantity: 0,
                                    weight: 0,
                                },
                                allotment: false,
                                class: 'O',
                            },
                        ],
                    },
                ],
            },
        ],
        travelers: [
            {
                id: '1',
                dateOfBirth: '2007-01-23',
                gender: 'MALE',
                firstName: 'Urimubenshi',
                lastName: 'Daniel',
            },
        ],
        automatedProcess: [
            {
                code: 'DELAYED',
                queue: {
                    number: '5',
                    category: '5',
                },
                officeId: 'BERL128EU',
                delay: '1D',
            },
        ],
        contacts: [
            {
                address: {
                    postalCode: '12559',
                    countryCode: 'DE',
                    cityName: 'Berlin',
                    lines: ['Mittelbrunner Steig 5'],
                },
            },
            {
                address: {
                    postalCode: '00000',
                    countryCode: 'RW',
                    cityName: 'Kigali',
                    lines: ['Kigali'],
                },
                phones: {
                    deviceType: 'MOBILE',
                    countryCallingCode: '49',
                    number: '0780289113',
                },
                emailAddress: 'ichristine180@gmail.com',
            },
        ],
    },
};

export default sampleTripData;
