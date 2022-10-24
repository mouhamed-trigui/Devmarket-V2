import React from 'react';

type PermissionContextType = {
    hasPermission: (permission: string) => boolean;
};

const defaultBehavior: PermissionContextType = {
    hasPermission: () => false,
};

const PermissionContext = React.createContext(defaultBehavior);

export default PermissionContext;
