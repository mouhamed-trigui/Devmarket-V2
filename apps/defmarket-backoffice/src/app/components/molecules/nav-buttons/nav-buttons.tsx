import './nav-buttons.module.scss';
import {
    IonButton,
    IonButtons,
    IonMenuButton,
    IonSplitPane,
} from '@ionic/react';
import React, { useEffect } from 'react';
import { menuController } from '@ionic/core';
import Menu from '../menu/menu';

/* eslint-disable-next-line */
export interface NavButtonsProps {}

export const NavButtons = (props: NavButtonsProps) => {
    const [mQuery, setMQuery] = React.useState<any>({
        matches: window.innerWidth > 768 ? true : false,
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        mediaQuery.addListener(setMQuery);

        return () => mediaQuery.removeListener(setMQuery);
    }, []);

    return (
        <div>
            {mQuery && !mQuery.matches ? (
                <IonButtons slot="start">
                    <IonMenuButton
                        autoHide={false}
                        onClick={() => menuController.open()}
                    ></IonMenuButton>
                </IonButtons>
            ) : null}
        </div>
    );
};
export default NavButtons;
