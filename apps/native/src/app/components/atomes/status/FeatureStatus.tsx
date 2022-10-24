import React from 'react';
import { Badge } from 'native-base';
import { alerts, primary, secondary } from '../../../theme/colors';
import { Text } from '..';

const FeatureStatus = (props: {
    status?: 'ready' | 'in_development' | 'under_design' | 'in_Reflexion';
}) => {
    switch (props.status) {
        case 'ready':
            return <StatusReady />;
        case 'in_development':
            return <StatusDevelopement />;
        case 'under_design':
            return <StatusConception />;
        case 'in_Reflexion':
            return <StatusReflection />;
        default:
            return <></>;
    }
};
const StatusReady = () => {
    return (
        <Badge backgroundColor={alerts[50]}>
            <Text>Prêt le XX/XX/XXXX</Text>
        </Badge>
    );
};
const StatusConception = () => {
    return (
        <Badge backgroundColor={primary[50]}>
            <Text>En conception</Text>
        </Badge>
    );
};
const StatusReflection = () => {
    return (
        <Badge backgroundColor={secondary[50]}>
            <Text>En Réflexion</Text>
        </Badge>
    );
};
const StatusDevelopement = () => {
    return (
        <Badge backgroundColor={secondary[300]}>
            <Text>En réalisation</Text>
        </Badge>
    );
};
export default FeatureStatus;
