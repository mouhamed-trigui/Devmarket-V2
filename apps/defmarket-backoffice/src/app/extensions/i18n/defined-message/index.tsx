import { defineMessages } from 'react-intl';

export const companyType = defineMessages({
    PROFESSIONAL: {
        id: 'PROFESSIONAL',
        defaultMessage: 'Entreprise individuelle',
        description: 'Entreprise individuelle',
    },
    PRIVATE_PERSON: {
        id: 'PRIVATE_PERSON',
        defaultMessage: 'Societé',
        description: 'Societé',
    },
    OTHER: {
        id: 'OTHER',
        defaultMessage: 'Autres (Centre commerciale, marque...)',
        description: 'Autres (Centre commerciale, marque...)',
    },
    UNDEFINED: {
        id: 'UNDEFINED',
        defaultMessage: '-',
        description: '-',
    },
});

export const storeType = defineMessages({
    PHYSICAL: {
        id: 'PHYSICAL_S',
        defaultMessage: 'Structure Physique',
        description: 'Structure Physique',
    },
    E_COMMERCE: {
        id: 'E_COMMERCE_S',
        defaultMessage: 'Structure E-Commerce',
        description: 'Structure E-Commerce',
    },
    UNDEFINED: {
        id: 'UNDEFINED',
        defaultMessage: '-',
        description: '-',
    },
});

export const offerType = defineMessages({
    PERCENTAGE: {
        id: 'PERCENTAGE',
        defaultMessage: 'Pourcentage',
        description: 'Pourcentage',
    },
    FLAT: {
        id: 'FLAT',
        defaultMessage: 'Réduction Fixe',
        description: 'Réduction Fixe',
    },
    GOOD_PLAN: {
        id: 'GOOD_PLAN',
        defaultMessage: 'Bon Plan',
        description: 'Bon Plan',
    },
    UNDEFINED: {
        id: 'UNDEFINED',
        defaultMessage: '-',
        description: '-',
    },
});

export const offerCategory = defineMessages({
    PHYSICAL: {
        id: 'PHYSICAL_O',
        defaultMessage: 'Offre physique',
        description: 'Offre physique',
    },
    E_COMMERCE: {
        id: 'E_COMMERCE_O',
        defaultMessage: 'Offre e-commerce',
        description: 'Offre e-commerce',
    },
    UNDEFINED: {
        id: 'UNDEFINED',
        defaultMessage: '-',
        description: '-',
    },
});

export const offerTheme = defineMessages({
    NOEL: {
        id: 'NOEL',
        defaultMessage: 'Noël',
        description: 'Noël',
    },
    HALLOWEEN: {
        id: 'HALLOWEEN',
        defaultMessage: 'Halloween',
        description: 'Halloween',
    },
    PAQUES: {
        id: 'PAQUES',
        defaultMessage: 'Paques',
        description: 'Paques',
    },
    TOUSSAINT: {
        id: 'TOUSSAINT',
        defaultMessage: 'Toussaint',
        description: 'Toussaint',
    },
    PROMO_FALSH: {
        id: 'PROMO_FALSH',
        defaultMessage: 'Promo Flash',
        description: 'Promo Flash',
    },
    BLACK_FRIDAY: {
        id: 'BLACK_FRIDAY',
        defaultMessage: 'Black Friday',
        description: 'Black Friday',
    },
    MOTHER_PARTY: {
        id: 'MOTHER_PARTY',
        defaultMessage: 'Fête des mères',
        description: 'Fête des mères',
    },
    FATHER_PARTY: {
        id: 'FATHER_PARTY',
        defaultMessage: 'Fête des pères',
        description: 'Fête des pères',
    },
    BACK_TO_SCHOOL: {
        id: 'BACK_TO_SCHOOL',
        defaultMessage: 'Rentrée des classes',
        description: 'Rentrée des classes',
    },
    NATIONAL_PARTY: {
        id: 'NATIONAL_PARTY',
        defaultMessage: 'Saint Patrick',
        description: 'Saint Patrick',
    },
    LIQUIDATION: {
        id: 'LIQUIDATION',
        defaultMessage: 'Liquidation',
        description: 'Liquidation',
    },
    SAINT_PATRICK: {
        id: 'SAINT_PATRICK',
        defaultMessage: 'Fête Nationale',
        description: 'Fête Nationale',
    },
    YEARS_DAY: {
        id: 'YEARS_DAY',
        defaultMessage: "Jour de l'an",
        description: "Jour de l'an",
    },
    SAINT_VALENTIN: {
        id: 'SAINT_VALENTIN',
        defaultMessage: 'Saint Valentin',
        description: 'Saint Valentin',
    },
    NO_THEME: {
        id: 'NO_THEME',
        defaultMessage: 'Aucun thème',
        description: 'Aucun thème',
    },
    UNDEFINED: {
        id: 'UNDEFINED',
        defaultMessage: '-',
        description: '-',
    },
});

export const notficationsType = defineMessages({
    PUSH: {
        id: 'PUSH',
        defaultMessage: 'Notification Push',
        description: 'Notification Push',
    },
    INTERNAL: {
        id: 'INTERNAL',
        defaultMessage: 'Notification Interne',
        description: 'Notification Interne',
    },
});
