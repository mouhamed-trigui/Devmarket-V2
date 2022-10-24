import { AlertDialog, Button } from 'native-base';
import React from 'react';
import { Text } from '../../../atomes';
import { system } from '../../../../theme/colors';

export interface IYesNoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onPress: () => void;
    title: string;
    body: string;
    buttonLeftTitle?: string;
    buttonRightTitle?: string;
    textAlignBody?:
        | 'right'
        | 'left'
        | 'inherit'
        | 'initial'
        | 'center'
        | 'justify'
        | '-moz-initial'
        | 'revert'
        | 'end'
        | 'start'
        | undefined;
}

const YesNoDialog = (props: IYesNoDialogProps) => {
    const cancelRef = React.useRef(null);
    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={props.isOpen}
            onClose={props.onClose}
            backgroundColor="#00a9c736"
        >
            <AlertDialog.Content backgroundColor="white">
                <AlertDialog.CloseButton />
                <AlertDialog.Header alignSelf="center" borderBottomWidth={0}>
                    <Text textAlign="center" fontFamily="mono" color="black">
                        {props.title}
                    </Text>
                </AlertDialog.Header>
                <AlertDialog.Body>
                    <Text
                        textAlign={props.textAlignBody ?? 'center'}
                        color="black"
                    >
                        {props.body}
                    </Text>
                </AlertDialog.Body>
                <AlertDialog.Footer
                    backgroundColor="white"
                    borderTopColor={system[300]}
                    borderTopWidth={1}
                >
                    <Button
                        flexGrow={1}
                        variant="unstyled"
                        onPress={props.onPress}
                        borderRadius={0}
                        borderColor={system[300]}
                        borderRightWidth={1}
                    >
                        <Text color="black" fontFamily="mono">
                            {props.buttonLeftTitle ?? 'Oui'}
                        </Text>
                    </Button>
                    <Button
                        flexGrow={1}
                        variant="unstyled"
                        onPress={props.onClose}
                        ref={cancelRef}
                    >
                        <Text color="black" fontFamily="mono">
                            {props.buttonRightTitle ?? 'Non'}
                        </Text>
                    </Button>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default YesNoDialog;
