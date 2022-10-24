import { View, Text, TouchableOpacity } from 'react-native';
import React, { createContext, FC, useState } from 'react';
import { info } from '../../../theme/colors';
import { Close } from '../../../theme/svgs';

export const DialogContext = createContext<{
    setDialog: React.Dispatch<
        React.SetStateAction<{
            dialogVisibility: boolean;
            title: string;
            message: string;
            buttonLeft: string;
            buttonRight: string;
            onPress: () => void;
        }>
    >;
}>({
    setDialog: () => undefined,
});

const DialogProvider: FC<{ children }> = ({ children }) => {
    const [dialog, setDialog] = useState({
        dialogVisibility: false,
        title: '',
        message: '',
        buttonLeft: '',
        buttonRight: '',
        onPress: () => undefined,
    });
    const [onPress, setOnPress] = useState<() => void>();
    return (
        <DialogContext.Provider
            value={{
                setDialog,
            }}
        >
            {children}
            {dialog.dialogVisibility && (
                <View
                    style={{
                        backgroundColor: info[50] + '5B',
                        flex: 1,
                        elevation: 1,
                        zIndex: 999,
                        position: 'absolute',
                        display: 'flex',
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <View
                        style={{
                            width: '80%',
                            borderColor: '#AAA',
                            borderWidth: 1,
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            backgroundColor: '#FFFF',
                            borderRadius: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: 8,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: info[50],
                                }}
                            >
                                {dialog.title}
                            </Text>

                            <TouchableOpacity
                                onPress={() =>
                                    setDialog({
                                        ...dialog,
                                        dialogVisibility: false,
                                    })
                                }
                                style={{
                                    position: 'absolute',
                                    right: 14,
                                    top: 8,
                                }}
                            >
                                <Close fill={info[50]} height={15} width={15} />
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={{
                                marginVertical: 20,
                                color: info[50],
                                fontSize: 15,
                                textAlign: 'center',
                                marginHorizontal: 10,
                                alignSelf: 'center',
                            }}
                        >
                            {dialog.message}
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 15,
                                justifyContent: 'space-between',
                                borderTopWidth: 1,
                                borderTopColor: '#eee9e9',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    dialog.onPress();
                                    setDialog({
                                        ...dialog,
                                        dialogVisibility: false,
                                    });
                                }}
                                style={{
                                    width: '50%',
                                    height: 50,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: info[50],
                                            alignSelf: 'center',
                                        }}
                                    >
                                        {dialog.buttonLeft}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setDialog({
                                        ...dialog,
                                        dialogVisibility: false,
                                    });
                                }}
                                style={{
                                    width: '50%',
                                    height: 50,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: info[50],
                                            alignSelf: 'center',
                                        }}
                                    >
                                        {dialog.buttonRight}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </DialogContext.Provider>
    );
};

export default DialogProvider;
