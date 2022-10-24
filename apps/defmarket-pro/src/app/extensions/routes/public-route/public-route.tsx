import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* eslint-disable-next-line */
export interface PublicRouteProps {
    name: string;
    options: any;
    component: any;
    rest?: any;
    navigation?: any;
}
const Stack = createNativeStackNavigator();

export function PublicRoute(props: PublicRouteProps) {
    return (
        <Stack.Screen
            name={props?.name}
            options={props?.options}
            {...props?.rest}
            component={props?.component}
        />
    );
}

export default PublicRoute;
