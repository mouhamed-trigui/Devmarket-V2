import React from 'react';
import { colors } from '../../../theme/colors';
import Dialog from '../../molecules/dialog/Dialog';
import { Typography } from '@mui/material';

export interface IDeleteDialogProps {
    children: React.ReactElement;
    onClick: () => void;
    title?: string;
    body?: string;
}

const DeleteDialog = (props: IDeleteDialogProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const childrenWithOnClick = React.cloneElement(props.children, {
        onClick: () => setIsOpen(true),
    });
    return (
        <>
            <Dialog
                titleMargin={33}
                maxWidth="xs"
                isOpen={isOpen}
                title={props.title ?? 'Attention!'}
                body={
                    <Typography
                        align="center"
                        fontSize={13}
                        color={colors.primary}
                    >
                        {props.body ??
                            'Cette action ne peut pas être annulée. Les données supprimées ne peuvent pas être récupérées.'}
                    </Typography>
                }
                onClose={onClose}
                action={{
                    cancel: {
                        label: 'Non',
                    },
                    submit: {
                        onClick: () => {
                            props?.onClick();
                            setIsOpen(false);
                        },
                        label: 'Oui',
                    },
                    reverse: true,
                }}
            />
            {childrenWithOnClick}
        </>
    );
};

export default DeleteDialog;
