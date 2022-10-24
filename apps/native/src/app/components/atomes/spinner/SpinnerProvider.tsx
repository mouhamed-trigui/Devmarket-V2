import React, { createContext } from 'react';
import { HStack, Spinner } from 'native-base';
import { Platform } from 'react-native';

export const SpinnerContext = createContext<{
    setSpinnerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}>({ setSpinnerVisibility: () => undefined });

const SpinnerProvider: React.FC = ({ children }) => {
    const [spinnerVisibility, setSpinnerVisibility] = React.useState(false);
    return (
        <SpinnerContext.Provider value={{ setSpinnerVisibility }}>
            {spinnerVisibility && (
                <HStack
                    justifyContent="center"
                    style={{
                        width: '100%',
                        height: '100%',
                        zIndex: 999,
                        position: 'absolute',
                        alignItems: 'center',
                        backgroundColor: '#00000046',
                    }}
                >
                    <Spinner size={Platform.OS === 'ios' ? 'sm' : 'lg'} />
                </HStack>
            )}
            {children}
        </SpinnerContext.Provider>
    );
};

export default SpinnerProvider;
