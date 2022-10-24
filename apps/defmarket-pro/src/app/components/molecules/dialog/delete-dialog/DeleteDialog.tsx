import React from 'react';
import { AlertDialog, Button } from 'native-base';
import { Text } from '../../../atomes';
import { system } from '../../../../theme/colors';
import YesNoDialog from '../yes-no-dialog/YesNoDialog';

export interface IDeleteDialogProps {
    children: React.ReactElement;
    onPress: () => void;
    title?: string;
    body?: string;
}

const DeleteDialog = (props: IDeleteDialogProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const childrenWithOnClick = React.cloneElement(props.children, {
        onPress: () => setIsOpen(true),
    });

    return (
        <>
            <YesNoDialog
                isOpen={isOpen}
                onClose={onClose}
                onPress={props.onPress}
                title={props.title ?? 'Attention!'}
                body={
                    props.body ??
                    'Cette action ne peut pas être annulée. Les données supprimées ne peuvent pas être récupérées.'
                }
            />
            {childrenWithOnClick}
        </>
    );
};

export default DeleteDialog;
