import React, { useContext } from 'react';
import PermissionContext from './PermissionContext';
import Forbidden from './Forbidden';

const HasPermission: React.FC<{
    to: string;
    action?: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
    hideChildren?: boolean;
}> = ({ to, action, children, hideChildren }) => {
    const { hasPermission } = useContext(PermissionContext);
    if (
        action
            ? hasPermission(`PERM_${to.toUpperCase()}_${action}`)
            : hasPermission(`PERM_${to.toUpperCase()}`)
    ) {
        return <>{children}</>;
    }
    return hideChildren ? null : <Forbidden />;
};

export default HasPermission;
