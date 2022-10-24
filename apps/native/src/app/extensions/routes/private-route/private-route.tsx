/* eslint-disable-next-line */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { lazy } from 'react';

export interface PrivateRouteProps {
    isAuthenticated: boolean;
    restricted?: boolean;
    name: string;
    options: any;
    children: any;
    rest?: any;
    navigation?: any;
}
const Stack = createNativeStackNavigator();

export function PrivateRoute(props: PrivateRouteProps) {
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /Login page
    return props?.isAuthenticated
        ? // restricted = false meaning private route
          // restricted = true meaning restricted private route
          props?.restricted
            ? props?.navigation.navigate('Home')
            : props?.children
        : props?.navigation.navigate('Login');
}

export default PrivateRoute;
