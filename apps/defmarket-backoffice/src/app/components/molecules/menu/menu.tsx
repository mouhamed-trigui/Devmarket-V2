import './menu.module.scss';
import styled from 'styled-components';

import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
} from '@ionic/react';
import ShopIcon from '../../../../assets/svg/shop-bleu-f.svg';
import EtiquetteIcon from '../../../../assets/svg/etiquette-de-vente-blue.svg';
import BureauIcon from '../../../../assets/svg/bureau-bleu-f_bis.svg';
import UserIcon from '../../../../assets/svg/user-bleu.svg';
import HomeIcon from '../../../../assets/svg/home.svg';
import HelpIcon from '../../../../assets/svg/help.svg';
import NotificationsIcon from '../../../../assets/svg/bouton-notifications-bleu-f.svg';

import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    settingsOutline,
    settingsSharp,
    cashOutline,
    cashSharp,
    helpCircle,
    logOut,
} from 'ionicons/icons';
// import './Menu.css';

/* eslint-disable-next-line */
export interface MenuProps {}

interface AppPage {
    url: string;
    iosIcon: any;
    mdIcon: any;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Tableau de bord',
        url: '/dashboard',
        iosIcon: HomeIcon,
        mdIcon: HomeIcon,
    },

    {
        title: 'Comptes professionnels',
        url: '/pro-account',
        iosIcon: UserIcon,
        mdIcon: UserIcon,
    },
    {
        title: 'Entreprises',
        url: '/companies',
        iosIcon: BureauIcon,
        mdIcon: BureauIcon,
    },
    {
        title: 'Boutiques',
        url: '/structures',
        iosIcon: ShopIcon,
        mdIcon: ShopIcon,
    },
    {
        title: 'Offres',
        url: '/offres',
        iosIcon: EtiquetteIcon,
        mdIcon: EtiquetteIcon,
    },
    {
        title: 'Notifications Push',
        url: '/notifications',
        iosIcon: NotificationsIcon,
        mdIcon: NotificationsIcon,
    },
];

const options: AppPage[] = [
    {
        title: 'Aide',
        url: '/help',
        iosIcon: helpCircle,
        mdIcon: helpCircle,
    },
    {
        title: 'Paramètres ',
        url: '/settings ',
        iosIcon: settingsOutline,
        mdIcon: settingsSharp,
    },
    {
        title: 'Déconnexion',
        url: '/logout',
        iosIcon: logOut,
        mdIcon: logOut,
    },
];

const CustomIonItem = styled(IonItem)`
    --background: #f6f6f7;
    --background-focused: #00aac7;
    --background-hover: #00aac7;
    --ion-color-shade: white !important;
    --border-width: 1px 0px !important;
`;
const Menu: React.FC = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="main" side="start">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: '#f6f6f7',
                }}
            >
                <IonList id="main-list" style={{ paddingBottom: 'unset' }}>
                    {appPages.map((appPage, index) => (
                        <IonMenuToggle key={index} autoHide={false}>
                            <CustomIonItem
                                color={
                                    location.pathname === appPage.url
                                        ? 'secondary'
                                        : 'light'
                                }
                                style={{ borderColor: 'white' }}
                                routerLink={appPage.url}
                                routerDirection="none"
                                lines="full"
                                detail={false}
                            >
                                <IonIcon
                                    style={{
                                        color:
                                            location.pathname === appPage.url
                                                ? 'white'
                                                : '#003753',
                                    }}
                                    slot="start"
                                    ios={appPage.iosIcon}
                                    md={appPage.mdIcon}
                                />
                                <IonLabel>{appPage.title}</IonLabel>
                            </CustomIonItem>
                        </IonMenuToggle>
                    ))}
                </IonList>

                <IonList id="options-list" style={{ padding: 'unset' }}>
                    {options.map((option, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <CustomIonItem
                                    color={
                                        location.pathname === option.url
                                            ? 'secondary'
                                            : 'light'
                                    }
                                    routerLink={option.url}
                                    routerDirection="none"
                                    lines="full"
                                    detail={false}
                                >
                                    <IonIcon
                                        slot="start"
                                        style={{
                                            color:
                                                location.pathname === option.url
                                                    ? 'white'
                                                    : '#003753',
                                        }}
                                        ios={option.iosIcon}
                                        md={option.mdIcon}
                                    />
                                    <IonLabel>{option.title}</IonLabel>
                                </CustomIonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </div>
        </IonMenu>
    );
};

export default Menu;
