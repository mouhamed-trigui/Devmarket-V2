import styled from '@emotion/styled';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonIcon,
} from '@ionic/react';
import { arrowBackCircleSharp } from 'ionicons/icons';
/* eslint-disable-next-line */
export interface ProfilProAccountProps {
    history?: any;
}

export function ProfilProAccount(props: ProfilProAccountProps) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons
                        slot="start"
                        style={{ marginLeft: 20 }}
                        onClick={() => props?.history?.goBack()}
                    >
                        <IonIcon
                            style={{ color: '#003753' }}
                            slot="start"
                            ios={arrowBackCircleSharp}
                            md={arrowBackCircleSharp}
                        />
                    </IonButtons>

                    <IonTitle>Profil : (X) </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Welcome to ProfilProAccount!</h1>
                
            </IonContent>
        </IonPage>
    );
}

export default ProfilProAccount;
