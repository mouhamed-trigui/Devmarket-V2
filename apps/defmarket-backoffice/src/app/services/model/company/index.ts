import { ICompany } from '../accounts';
export interface companyProps extends ICompany {
    ownerId: number;
}

export interface ICompanyFilter {
    validated?: boolean;
    blocked?: boolean;
    canBeValidated?: boolean;
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
