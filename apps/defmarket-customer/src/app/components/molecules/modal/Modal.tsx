import React, { ReactElement, useContext, useState } from 'react';
import {
    Modal as MModal,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { Card } from './../../atomes/card';
import VStack from '../../atomes/stack/VStack';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../stores/slices/user/user';
export interface ModalProps {
    height?: number | string;
    hPadding?: number;
    vPadding?: number;
    icon?: ReactElement;
    borderRadius?: number;
    containtStyle?: ViewStyle;
    children: ReactElement;
    modalName: string;
    iconAction?: () => void;
}
function Modal(props: ModalProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    return (
        <MModal
            animationType="fade"
            visible={user.modalStatus[props?.modalName]}
            transparent={true}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                }}
                onPress={() => {
                    dispatch(
                        userActions.setModalStatus({
                            modalName: props?.modalName ?? 'general',
                            modalStatus: false,
                        })
                    );
                }}
            >
                <VStack
                    justifyContent="flex-end"
                    style={{
                        backgroundColor: theme.colors.info[800],
                        flex: 1,
                    }}
                >
                    <View
                        /* STOP PROPAGATION */
                        onStartShouldSetResponder={(event) => true}
                        onTouchEnd={(e) => {
                            e.stopPropagation();
                        }}
                        style={{
                            width: '100%',
                        }}
                    >
                        <Card
                            height={props?.height ?? 'auto'}
                            hPadding={props?.hPadding ?? null}
                            vPadding={props?.vPadding ?? null}
                            borderTopLeftRadius={props?.borderRadius ?? 0}
                            borderTopRightRadius={props?.borderRadius ?? 0}
                            style={{ ...props.containtStyle }}
                        >
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    zIndex: 10,
                                }}
                                onPress={() => {
                                    props?.iconAction();
                                }}
                            >
                                {props.icon}
                            </TouchableOpacity>
                            {/* icon: icon name / onPress=> action  */}

                            {props.children}
                        </Card>
                    </View>
                </VStack>
            </TouchableOpacity>
        </MModal>
    );
}

export default Modal;
