import React from 'react';
import CrispChat, { show } from 'react-native-crisp-chat-sdk';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';

const Contact = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    // CRISP
    const [showChat, setShowChat] = React.useState<boolean>(false);
    useEffect(() => {
        if (isFocused) {
            show();
            setShowChat(true);
        }
    }, [isFocused]);

    useEffect(() => {
        if (showChat) {
            setShowChat(false);
            navigation.goBack();
        }
    }, [showChat]);

    return <CrispChat />;
};

export default Contact;
