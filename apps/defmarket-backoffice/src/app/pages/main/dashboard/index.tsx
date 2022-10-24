import { Route, Redirect, Router } from 'react-router-dom';
import Dashboard from './dashboard';
/* eslint-disable-next-line */
export interface IndexProps {
    history: any;
}

export function Index(props: IndexProps) {
    return (
        <Router history={props?.history}>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/statistics/:id" component={Dashboard} />
            <Route
                path="/"
                render={() => <Redirect to="/dashboard" />}
                exact={true}
            />
        </Router>
    );
}

export default Index;
