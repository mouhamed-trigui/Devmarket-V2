import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import Input from '../../atoms/form/input/Input';
import Dialog from '../../molecules/dialog/Dialog';

const Body = (props: {
    data: {
        subject: { value: string; onChange: (subject: string) => void };
        message: { value: string; onChange: (message: string) => void };
    };
}) => {
    return (
        <Stack spacing={2}>
            <Typography
                variant="body1"
                fontWeight={600}
                fontSize={13}
                color="black"
            >
                Sujet
            </Typography>

            <Input
                value={props.data.subject.value}
                onChange={props.data.subject.onChange}
            />
            <Typography
                variant="body1"
                fontWeight={600}
                fontSize={13}
                color="black"
            >
                Votre message
            </Typography>

            <Input
                value={props.data.message.value}
                onChange={props.data.message.onChange}
                multiline
                rows={6}
            />
        </Stack>
    );
};

interface ISendMessageProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: () => void;
    data: {
        subject: { value: string; onChange: (subject: string) => void };
        message: { value: string; onChange: (message: string) => void };
    };
}

const SendMessage: FC<ISendMessageProps> = ({
    isOpen,
    onClose,
    data,
    onSend,
}) => {
    return (
        <Dialog
            separate
            fullWidth={true}
            maxWidth="xs"
            isOpen={isOpen}
            onClose={() => {
                onClose();
                data.subject.onChange('');
                data.message.onChange('');
            }}
            title="Votre Message"
            body={<Body data={data} />}
            action={{
                cancel: { label: 'Annuler' },
                submit: {
                    onClick: onSend,
                    label: 'Envoyer',
                },
            }}
        />
    );
};

export default SendMessage;
