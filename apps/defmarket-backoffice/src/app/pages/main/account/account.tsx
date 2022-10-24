import './account.module.scss';
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
export interface AccountProps {}

export function Account(props: AccountProps) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Compte utilisateur</IonTitle>
                    <IonButtons slot="start">
                        <Molecules.NavButtons />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Welcome to Account!</h1>
            </IonContent>
        </IonPage>
    );
}

export default Account;
