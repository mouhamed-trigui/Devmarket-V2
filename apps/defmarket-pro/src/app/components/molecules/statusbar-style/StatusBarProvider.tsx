import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';

export const StatusBarContext = createContext<{
    setStatusBarStyle?: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}>({});

const StatusBarProvider: React.FC = (props) => {
    const [statusBarStyle, setStatusBarStyle] = useState<'dark' | 'light'>(
        'dark'
    );

    return (
        <StatusBarContext.Provider value={{ setStatusBarStyle }}>
            <StatusBar style={statusBarStyle} />
            {props.children}
        </StatusBarContext.Provider>
    );
};

export default StatusBarProvider;
