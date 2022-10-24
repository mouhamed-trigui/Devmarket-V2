import './dashboard.module.scss';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tableau de bord</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Welcome to Dashboard!</h1>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;
