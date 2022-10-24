import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import AppBar from './components/molecules/app-bar/app-bar';
import Home from './pages/Home';
import Dashboard from './pages/main/dashboard/index';
import Account from './pages/main/account/account';
import Activities, {
    Notification,
} from './pages/main/notification/notification';
import Paiement from './pages/main/paiement/paiement';
import Settings_ from './pages/main/settings/settings';
import Structures from './pages/main/structures/structures';
import Companies from './pages/main/companies/companies';

import Login from './pages/auth/login/login';
import Logout from './pages/auth/logout/logout';

import { Molecules } from './components';
import { useSelector } from 'react-redux';
import axiosInstance from './services/constants/api';
import { me } from './services/methodes/auth';
// Redux
import { useDispatch } from 'react-redux';
import { userActions } from './store/user/index.slice';
import Offers from './pages/main/offers/offers';
import ProAccountEdit from './pages/main/pro-account/edit/pro-account-edit';
import ProAccount from './pages/main/pro-account/pro-account';
import ProAccountValidation from './pages/main/pro-account/validation/ProAccountValidation';
import { Router, useHistory, Switch } from 'react-router';

const App: React.FC = (props: any) => {
    const { isLoggedIn, user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    // Life cycle
    useEffect(() => {
        const getAccessToken = async () => {
            const token = localStorage.getItem('@Access_Token');
            if (token) {
                // set access token in header axios
                axiosInstance.defaults.headers.common['Authorization'] =
                    'Bearer ' + token;
                // check user validity by access token
                me()
                    .then((res: any) => {
                        dispatch(userActions.setUser(res?.data));
                        dispatch(userActions.setIsLoggedIn(true));
                    })
                    .catch(async (err: any) => {
                        console.error(err);
                    });
            } else {
                // clean up
                dispatch(userActions.setUser(null));
                dispatch(userActions.setIsLoggedIn(false));
                history.replace('login');
            }
        };
        getAccessToken();
    }, []);

    return (
        <IonApp>
            <IonReactRouter history={history}>
                {!isLoggedIn && (
                    <Route path="/login" component={Login} exact={true} />
                )}
                {isLoggedIn && !user?.blocked && user?.roles ? (
                    <div style={{ display: 'flex' }}>
                        <AppBar />
                        <IonSplitPane
                            contentId="main"
                            when="lg"
                            style={{ marginTop: 60 }}
                        >
                            <Molecules.Menu />
                            <IonRouterOutlet id="main">
                                <Switch>
                                    <Route
                                        path="/dashboard"
                                        component={Dashboard}
                                        exact={true}
                                    />
                                    {/* <Route
                                    path="/account"
                                    component={Account}
                                    exact={true}
                                /> */}
                                    <Route
                                        path="/activities"
                                        component={Activities}
                                        exact={true}
                                    />
                                    <Route
                                        path="/paiement"
                                        component={Paiement}
                                        exact={true}
                                    />
                                    <Route
                                        path="/structures"
                                        component={Structures}
                                        exact={true}
                                    />
                                    <Route
                                        path="/companies"
                                        component={Companies}
                                        exact={true}
                                    />
                                    <Route
                                        path="/pro-account"
                                        component={ProAccount}
                                        exact={true}
                                    />
                                    <Route
                                        path="/edit/:id"
                                        children={<ProAccountEdit />}
                                    />
                                    <Route
                                        path="/validate/:id"
                                        children={<ProAccountValidation />}
                                    />
                                    <Route
                                        path="/settings"
                                        component={Settings_}
                                        exact={true}
                                    />
                                    <Route
                                        path="/offres"
                                        component={Offers}
                                        exact={true}
                                    />
                                    <Route
                                        path="/notifications"
                                        component={Notification}
                                        exact={true}
                                    />
                                    <Route
                                        path="/logout"
                                        component={Logout}
                                        exact={true}
                                    />

                                    <Route
                                        exact
                                        path="/"
                                        render={() => (
                                            <Redirect to="/dashboard" />
                                        )}
                                    />
                                </Switch>
                            </IonRouterOutlet>
                        </IonSplitPane>
                    </div>
                ) : null}
                {/* {!isLoggedIn ? (
                    <Redirect to="/login" />
                ) : (
                    // <Redirect to="/pro-account" />
                    <Redirect to="*"></Redirect>
                )} */}
            </IonReactRouter>
            ,
        </IonApp>
    );
};

export default App;
