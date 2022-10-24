import {
    GET_OFFER_BY_STORE,
    GET_OFFER_BY_LEVEL,
    GET_STORE,
    GET_STORE_BY_ID,
    TIMETABLE_OF_STORE,
    DayEnum,
} from '../../../constants';
import { annoncesProps } from '../../../model/annonces';
import { IOfferStore } from '../../../model/store';
import { mock } from '../../mock';
import { ITimeTable } from './../../../model/store/index';

const loadStore = () => {
    mock.onGet(GET_STORE_BY_ID(1)).reply(() => {
        const store: any /*IStoreProps*/ = {
            id: 1,
            storeType: 'E_COMMERCE',
            logo: null,
            cover: {
                id: 1,
                name: 'store-default-cover.png',
                path: 'file/public/default/store-default-cover.png',
                size: null,
            },
            name: 'Xiaomi store',
            description: 'Xiaomi store',
            address: {
                country: 'Beja',
                department: 'Tech',
                city: 'Beja',
                street: 'Rue 18 janvier',
                zipCode: '9001',
            },
            geolocation: null,
            phoneList: [
                {
                    id: 1,
                    primary: true,
                    prefix: '+216',
                    number: '50655954',
                },
            ],
            website: {
                value: 'www.xiaomi.tn',
                public: true,
            },
            socialMedia: [
                {
                    id: 1,
                    type: 'OTHER',
                    value: 'xiaomi.tn',
                },
                {
                    id: 2,
                    type: 'INSTAGRAM',
                    value: 'xiaomi-tn',
                },
            ],
            email: 'xiaomi.tn@gmail.com',
            hideMyContacts: false,
            practicedOfferBeforeDM: {
                practiceOfferBeforeDM: true,
                practiceOfferBeforeDMText: 'string',
                targetedJobsBeforeDM: 'string',
            },
            offerNbr: 0,
            temporaryClosure: null,
            paymentMethods: [],
            category: {
                id: 1,
                name: 'Alimentaire & Ménager',
                description: 'Alimentaire & Ménager',
                storeType: 'PHYSICAL_AND_E_COMMERCE',
            },
            ecommerceAndPhysicalStore: true,
        };
        return [200, store];
    });

    mock.onGet(GET_OFFER_BY_STORE(1)).reply(() => {
        const offers: { data: IOfferStore[] } = {
            data: [
                {
                    id: 1,
                    offerType: 'FLAT',
                    value: '25',
                    title: "Code de réduction dès 25€ d'achat",
                    description: null,
                    startOfOffer: '2022-08-22T09:00:00Z',
                    endOfOffer: '2022-08-28T18:30:00Z',
                    photo: null,
                    attachedFile: null,
                    themeType: 'HALLOWEEN',
                    offerCategory: 'E_COMMERCE',
                    minOfferValue: null,
                    midOfferValue: null,
                    maxOfferValue: null,
                    validatedByAdmin: true,
                },
                {
                    id: 2,
                    offerType: 'PERCENTAGE',
                    value: '30',
                    title: "Les soldes d'hiver",
                    description: null,
                    startOfOffer: '2022-08-22T09:00:00Z',
                    endOfOffer: '2022-08-28T18:30:00Z',
                    photo: null,
                    attachedFile: null,
                    themeType: 'NOEL',
                    offerCategory: 'E_COMMERCE',
                    minOfferValue: null,
                    midOfferValue: null,
                    maxOfferValue: null,
                    validatedByAdmin: true,
                },
                {
                    id: 3,
                    offerType: 'GOOD_PLAN',
                    value: '25',
                    title: "Code de réduction dès 25€ d'achat",
                    description: null,
                    startOfOffer: '2022-08-22T09:00:00Z',
                    endOfOffer: '2022-08-28T18:30:00Z',
                    photo: null,
                    attachedFile: null,
                    themeType: 'HALLOWEEN',
                    offerCategory: 'E_COMMERCE',
                    minOfferValue: null,
                    midOfferValue: null,
                    maxOfferValue: null,
                    validatedByAdmin: true,
                },
                {
                    id: 4,
                    offerType: 'GOOD_PLAN',
                    value: '25',
                    title: 'Pour votre anniversaire',
                    description: null,
                    startOfOffer: '2022-08-22T09:00:00Z',
                    endOfOffer: '2022-08-28T18:30:00Z',
                    photo: null,
                    attachedFile: null,
                    themeType: 'SAINT_VALENTIN',
                    offerCategory: 'E_COMMERCE',
                    minOfferValue: null,
                    midOfferValue: null,
                    maxOfferValue: null,
                    validatedByAdmin: true,
                },
            ],
        };
        return [200, offers];
    });

    mock.onGet(GET_STORE).reply(() => {
        const stores: { data: any[] /*IStoreProps[]*/ } = {
            data: [
                {
                    id: 1,
                    id: 1,
                    title: 'Le Terroir de Loriot Le Terroir de Loriot',
                    image: 'https://reactnative.dev/img/tiny_logo.png',
                    status: 'Ouvert',
                    location: 'A 2km - Auriol',
                    openingTime: '9',
                    closingTime: '19',
                    type: 'E-commerce et physique',
                    coverImage:
                        'https://observatoire-des-aliments.fr/wp-content/uploads/2021/09/fruits-et-legumes-diabete-1.jpg',
                },
                {
                    id: 2,
                    id: 2,
                    title: 'Le Terroir de Loriot',
                    image: null,
                    status: 'Fermé',
                    location: 'A 2km - Auriol',
                    openingTime: '9',
                    closingTime: '19',
                    type: null,
                    coverImage:
                        'https://observatoire-des-aliments.fr/wp-content/uploads/2021/09/fruits-et-legumes-diabete-1.jpg',
                },
                {
                    id: 1,
                    id: 1,
                    title: 'Le Terroir de Loriot',
                    image:
                        'https://observatoire-des-aliments.fr/wp-content/uploads/2021/09/fruits-et-legumes-diabete-1.jpg',
                    status: 'Ouver dans 30 minutes',
                    location: 'A 2km - Auriol',
                    openingTime: '9',
                    closingTime: '19',
                    type: 'E-commerce',
                    coverImage:
                        'https://observatoire-des-aliments.fr/wp-content/uploads/2021/09/fruits-et-legumes-diabete-1.jpg',
                },
                {
                    id: 2,
                    id: 2,
                    title: 'Le Terroir de Loriot',
                    image: null,
                    status: 'Ouvert',
                    location: 'A 2km - Auriol',
                    openingTime: '9',
                    closingTime: '19',
                    type: 'E-commerce et physique',
                    coverImage:
                        'https://observatoire-des-aliments.fr/wp-content/uploads/2021/09/fruits-et-legumes-diabete-1.jpg',
                },
            ],
        };
        return [200, stores];
    });

    mock.onGet(GET_OFFER_BY_LEVEL(1)).reply(() => {
        const offer: {
            level: any[];
            title: string;
            description: string;
            status: boolean;
            startOfOffer: string;
            endOfOffer: string;
            value: string | number;
            offerType: string;
        } = {
            level: [
                {
                    offerCategory: 'PHYSICAL',
                    text: 'Activer le code',
                    offerType: 'Offre minimum',
                    level: 'niveau 1',
                    percentage: '5%',
                    accessibleOffer: 'Offre minimum',
                    description:
                        "Ce niveau est réservé aux utilisateurs ayant un compte validé. Pour obtenir cet avantage il vous suffit d'attendre la validation de votre compte ",
                    validated: false,
                },
                {
                    offerCategory: 'PHYSICAL',
                    text: 'Débloquer',
                    offerType: 'Offre medium',
                    level: 'niveau 2',
                    percentage: '15%',
                    accessibleOffer: 'Offre minimum',
                    description:
                        "Ce niveau est réservé aux adhérents de l'association. Pour obtenir cet avantage il vous suffit de souscrire à l'adhésion CO.OPS",
                    validated: false,
                },
                {
                    offerCategory: 'PHYSICAL',
                    text: 'Débloquer',
                    percentage: '25%',
                    accessibleOffer: 'Offre minimum',
                    offerType: 'Offre premium',
                    level: 'niveau 3',
                    description:
                        "Ce niveau est réservé aux adhérents de l'association qui sont également bénévole. Ce niveau n'est pas encore disponible, vous recevrez une notification lorsqu'il sera débloqué par nos équipes",
                    validated: false,
                },
            ],
            description:
                'Profitez de 25% de rabais Utilisabledans toute la boutique',
            status: true,
            title: "Remise jusqu'à 25% sans minimum d'achat chez Zalendo",
            value: '30',
            offerType: 'PERCENTAGE',
            startOfOffer: '31/12/21',
            endOfOffer: '31/12/22',
        };
        return [200, offer];
    });
};

const loadTimeTable = () => {
    mock.onGet(TIMETABLE_OF_STORE(1)).reply(() => {
        const timeTable: { data: ITimeTable[] } = {
            data: [
                {
                    id: 1,
                    day: DayEnum.MONDAY,
                    open24h: true,
                    workingTime: [
                        {
                            id: 1,
                            start: '08:00:00',
                            end: '22:00:00',
                        },
                    ],
                },
                {
                    id: 2,
                    day: DayEnum.TUESDAY,
                    open24h: false,
                    workingTime: [
                        {
                            id: 2,
                            start: '08:00:00',
                            end: '23:00:00',
                        },
                    ],
                },
                {
                    id: 3,
                    day: DayEnum.WEDNESDAY,
                    open24h: true,
                    workingTime: [],
                },
            ],
        };

        return [200, timeTable];
    });
};
export { loadStore, loadTimeTable };
