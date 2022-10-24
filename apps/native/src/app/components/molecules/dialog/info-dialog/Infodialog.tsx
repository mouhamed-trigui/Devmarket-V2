import React from 'react';
import { AlertDialog, Button } from 'native-base';
import { Text } from '../../../atomes';
import { system } from '../../../../theme/colors';
export interface IInfoDialog {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    body: string;
}
const Infodialog = (props: IInfoDialog) => {
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
                    <Text textAlign="justify" color="black">
                        {props.body}
                    </Text>
                </AlertDialog.Body>
                <AlertDialog.Footer
                    backgroundColor="white"
                    borderTopColor={system[300]}
                    borderTopWidth={1}
                >
                    <Button
                        _pressed={{ opacity: 0.2, backgroundColor: 'blue.200' }}
                        flexGrow={1}
                        variant="unstyled"
                        onPress={props.onClose}
                        borderRadius={0}
                        borderColor={system[300]}
                        borderRightWidth={1}
                    >
                        <Text color="black" fontFamily="mono">
                            OK
                        </Text>
                    </Button>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default Infodialog;
