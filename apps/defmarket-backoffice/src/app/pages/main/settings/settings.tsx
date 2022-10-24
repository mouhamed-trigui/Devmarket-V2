import './settings.module.scss';
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
export interface SettingsProps {}

export function Settings(props: SettingsProps) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                    <IonButtons slot="start">
                        <Molecules.NavButtons />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Welcome to settings!</h1>
            </IonContent>
        </IonPage>
    );
}

export default Settings;
