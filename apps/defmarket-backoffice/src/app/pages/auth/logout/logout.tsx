import React, { useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/user/index.slice';
import { useHistory } from 'react-router';

/* eslint-disable-next-line */
export interface LogoutProps {
    navigation: any;
}

export function Logout(props: LogoutProps) {
    // Redux
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const LogOut = async () => {
            // Clean up
            dispatch(userActions.setUser(null));
            dispatch(userActions.setIsLoggedIn(false));
            await localStorage.removeItem('@Access_Token');
            await localStorage.removeItem('@Refresh_Token');
            // Redirection
            history.replace('login');
        };
        LogOut();
    }, [history]);
    return null;
}
export default Logout;
