import { LatLng } from 'react-native-maps';
import { IDocument } from '..';

export interface companyProps {
    id: number;
    address: {
        city: string;
        department: string;
        pays: string;
        street: string;
        zipCode: string;
    };
    companyType?: 'OTHER' | 'PRIVATE_PERSON' | 'PROFESSIONAL';
    leaderType?: 'MANAGER' | 'PRESIDENT';
    name: string;
    siren: string;
    tva: string;
    ruler: {
        name: string;
        lastName: string;
    };
    blocked: boolean;
}

export interface IAddress {
    city: string;
    department: string;
    country: string;
    street: string;
    zipCode: string;
}

export interface IPersonalInfoProps<T> {
    public: boolean;
    value: T;
}

export interface ISocialMediaProps {
    id?: number;
    type: string;
    value: string;
}

export interface IPhoneProps {
    id?: number;
    prefix: string;
    number: string;
}

export interface IStoreCategoryProps {
    id: number;
    name: string;
    description: string;
}

export interface IStoreProps {
    website: IPersonalInfoProps<string>;
    email: string;
    id: number;
    description: string;
    logo?: IDocument;
    cover?: IDocument;
    name: string;
    address: IAddress;
    socialMedia: ISocialMediaProps[];
    socialMediaToRemove?: number[];
    phoneList: IPhoneProps[];
    phoneToRemove?: number[];
    geolocation: LatLng;
    visible: boolean;
    temporaryClosure?: ITemporaryClosureProps;
    hideMyContacts: boolean;
    category: {
        description: string;
        id: number;
        name: string;
        storeType: string;
    };
    offerNbr: number;
    timetables?: ITimetableProps[];
    paymentMethods: {
        name: 'CASH' | 'CHECK' | 'CB';
        condition: string;
    }[];
    validatedByAdmin: boolean;
    blocked: boolean;
}

export interface IStoreOfCompanyProps extends IStoreProps {
    companyId: number;
}

//IOfferOfStoreProps
export interface IOfferOfStoreProps extends IOffreProps {
    storeId: number;
}

export interface FileUpload extends File {
    uri: string;
    name: string;
    type: string;
}

export type FileType = FileUpload | File | null;

export interface IOffreProps {
    id: number;
    description: string;
    themeType: string;
    title: string;
    offerType: 'GOOD_PLAN' | 'FLAT' | 'PERCENTAGE' | null | undefined;
    value: string | null | undefined;
    startOfOffer: string;
    endOfOffer: string;
    attachedFile?: FileType | IDocument;
    photo?: FileType | IDocument;
    offerCategory?: 'PHYSICAL' | 'E_COMMERCE';
    minOfferValue?: string | null | undefined;
    midOfferValue?: string | null | undefined;
    maxOfferValue?: string | null | undefined;
}

export interface IOffreFilterProps {
    sortBy: 'endOfOffer' | 'startOfOffer';
    offerTypes?:
        | Array<'GOOD_PLAN' | 'FLAT' | 'PERCENTAGE' | 'CONDITIONAL_REDUCTION'>
        | undefined
        | null;
    themes?:
        | 'HALLOWEEN'
        | 'NOEL'
        | 'PAQUES'
        | 'TOUSSAINT'
        | 'NO_THEME'
        | undefined
        | null;
    status?: 'EXPIRED' | 'ACTIVE' | undefined | null;
    categoryOfferType?: 'PHYSICAL' | 'E_COMMERCE' | undefined | null;
    isActive: boolean;
}

export interface IValueProps {
    minimum: string | undefined;
    medium: string | undefined;
    premium: string | undefined;
}

export interface IFeatureDescriptionProps {
    icon: any;
    title: string;
    hasButton: boolean;
    description: string;
    marginBottom?: number;
    content: {
        type: 'text' | 'image' | 'custom_text';
        hideLeftCercleIcon?: boolean;
        value: JSX.Element | any;
    }[];
    status?: 'ready' | 'in_development' | 'under_design' | 'in_Reflexion';
}

export interface ITimetableProps {
    id?: number;
    day: string;
    open24h: boolean;
    active: boolean;
    workingTime:
        | {
              id?: number;
              start: string;
              end: string;
          }[]
        | null;
}

export interface ITemporaryClosureProps {
    closureType: string | null;
    reason: string;
}

export interface ITimetableWithTemporaryClosureProps {
    timetables: ITimetableProps[];
    temporaryClosure: ITemporaryClosureProps;
}

export interface IModalHomeTextProps {
    title: string;
    description: string;
    step1: string;
    textStep1: string;
    step2: string;
    textStep2: string;
    step3: string;
    textStep3: string;
    step4: string;
    textStep4: string;
    question: string;
    description1: string;
    description2: string;
    description3: string;
}

export interface IModalOfferTextProps {
    title: string;
    description: string;
    step1: string;
    textStep1: string;
    step2: string;
    textStep2: string;
    step3: string;
    textStep3: string;
    step4: string;
    textStep4: string;
    step5: string;
    textStep5: string;
    step6: string;
    textStep6: string;
    question: string;
    title1: string;
    percentage: string;
    reduction: string;
    bonPlan: string;
    example1: string;
    example2: string;
    example3: string;
    description1: string;
    description2: string;
    description4: string;
    description5: string;
    description6: string;
    description7: string;
    description8: string;
    description9: string;
    description10: string;
    description11: string;
    description12: string;
    description13: string;
    description14: string;
    description15: string;
    description16: string;
    description17: string;
    description18: string;
    description19: string;
    description20: string;
    description21: string;
}
export interface IStoreModel {
    id: number;
    name: string;
}
export interface ICompanyModel {
    companyId: number;
    companyName: string;
    storeList: IStoreModel[];
    nbOfStores: number;
}

export interface IDirigeant {
    nom: string;
    prenoms: string;
    annee_de_naissance: string;
    qualite: string;
}
export interface IStructure {
    siren: string;
    siege: {
        siret: number;
        date_creation: string;
        tranche_effectif_salarie: number;
        date_debut_activite: string;
        etat_administratif: string;
        activite_principale: string;
        complement_adresse: string;
        numero_voie: number;
        indice_repetition: string;
        type_voie: string;
        libelle_voie: string;
        distribution_speciale: string;
        cedex: string;
        libelle_cedex: string;
        commune: number;
        libelle_commune: string;
        code_pays_etranger: string;
        libelle_commune_etranger: string;
        libelle_pays_etranger: string;
        adresse_complete: string;
        adresse_complete_secondaire: string;
        code_postal: string;
        departement: string;
        geo_id: string;
        longitude: number;
        latitude: number;
        activite_principale_registre_metier: string;
    };
    dirigeants: IDirigeant[];
    date_creation: string;
    tranche_effectif_salarie: number;
    date_mise_a_jour: string;
    categorie_entreprise: string;
    etat_administratif: string;
    nom_raison_sociale: string;
    nature_juridique: string;
    activite_principale: string;
    section_activite_principale: string;
    economie_sociale_solidaire: string;
    nom_complet: string;
    nombre_etablissements: number;
    nombre_etablissements_ouverts: number;
    is_entrepreneur_individuel: boolean;
}
