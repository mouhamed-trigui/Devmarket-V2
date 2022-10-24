import React from 'react';
import { RouteComponentProps, Route, Redirect, Router } from 'react-router-dom';

import ProAccount from './pro-account';
import ProfilProAccount from './profil-pro-account/profil-pro-account';
import ValidationProAccount from './validation-pro-account/validation-pro-account';
import ProAccountEdit from './edit/pro-account-edit';
import ProAccountValidation from './validation/ProAccountValidation';

const Index: React.FC<RouteComponentProps> = ({ match, history }) => {
    return (
        <Router history={history}>
            <Route exact path={match.url} component={ProAccount} />

            <Route path={`${match.url}/edit/:id`} component={ProAccountEdit} />
            <Route
                path={`${match.url}/validate/:id`}
                component={ProAccountValidation}
            />
            <Route
                path={`${match.url}/validation/:id`}
                component={ValidationProAccount}
            />
            <Route
                path="/"
                render={() => <Redirect to="/pro-account" />}
                exact={true}
            />
        </Router>
    );
};

export default Index;
