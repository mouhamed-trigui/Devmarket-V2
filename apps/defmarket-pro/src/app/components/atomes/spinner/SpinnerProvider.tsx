import React, { createContext } from 'react';
import { HStack, Spinner } from 'native-base';

export const SpinnerContext = createContext<{
    setSpinnerVisibily: React.Dispatch<React.SetStateAction<boolean>>;
}>({ setSpinnerVisibily: () => undefined });

const SpinnerProvider: React.FC = ({ children }) => {
    const [spinnerVisibility, setSpinnerVisibily] = React.useState(false);
    return (
        <SpinnerContext.Provider value={{ setSpinnerVisibily }}>
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
                    <Spinner size="lg" />
                </HStack>
            )}
            {children}
        </SpinnerContext.Provider>
    );
};

export default SpinnerProvider;
