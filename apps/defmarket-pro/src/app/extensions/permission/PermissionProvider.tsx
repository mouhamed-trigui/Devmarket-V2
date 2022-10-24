import React from 'react';
import { useSelector } from 'react-redux';
import PermissionContext from './PermissionContext';

const PermissionProvider: React.FunctionComponent = ({ children }) => {
    const roles = useSelector((state: any) => state?.user?.user?.roles);
    const hasPermission = (permission: string) => roles.includes(permission);
    return (
        <PermissionContext.Provider value={{ hasPermission }}>
            {children}
        </PermissionContext.Provider>
    );
};

export default PermissionProvider;
