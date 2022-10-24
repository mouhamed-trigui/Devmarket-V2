import './paiement.module.scss';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
} from '@ionic/react';

import { Molecules } from '../../../components';
/* eslint-disable-next-line */
export interface PaiementProps {}

export function Paiement(props: PaiementProps) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Paiement</IonTitle>
                    <IonButtons slot="start">
                        <Molecules.NavButtons />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Welcome to Paiement!</h1>
            </IonContent>
        </IonPage>
    );
}

export default Paiement;
