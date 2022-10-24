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
export interface ValidationProAccountProps {
    history?: any;
}

export function ValidationProAccount(props: ValidationProAccountProps) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons
                        slot="start"
                        style={{ marginLeft: 20 }}
                        onClick={()=>props?.history?.goBack()}
                    >
                        <IonIcon
                            style={{ color: '#003753' }}
                            slot="start"
                            ios={arrowBackCircleSharp}
                            md={arrowBackCircleSharp}
                        />
                    </IonButtons>

                    <IonTitle>Validation des comptes (X) </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Welcome to Validation ProAccount!</h1>{' '}
            </IonContent>
        </IonPage>
    );
}

export default ValidationProAccount;
