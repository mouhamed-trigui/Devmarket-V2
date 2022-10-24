import React from 'react';
import DialogMUI, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../../theme/colors';
import { Typography, Stack, Divider, Box } from '@mui/material';

export interface IDialogProps {
    isOpen: boolean;
    onClose?: () => void;
    action?: {
        cancel?: { label?: string };
        submit?: { onClick: () => void; label?: string };
        reverse?: boolean;
    };
    title: string;
    bigTitle?: boolean;
    body: string | JSX.Element;
    maxWidth?: DialogProps['maxWidth'];
    fullWidth?: boolean;
    separate?: boolean;
    contentWidth?: string;
    titleMargin?: number;
}

const Dialog = (props: IDialogProps) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(props.isOpen);
    }, [props.isOpen]);

    const handleClose = () => {
        if (props?.onClose) {
            props.onClose();
        } else {
            setOpen(false);
        }
    };

    const handleClick = () => {
        if (props?.action?.submit?.onClick) {
            props.action?.submit.onClick();
        }
    };

    return (
        <DialogMUI
            scroll="body"
            PaperProps={{
                style: { borderRadius: 20 },
            }}
            maxWidth={props.maxWidth}
            fullWidth={props.fullWidth}
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Stack direction="row" justifyContent="center">
                <DialogTitle
                    style={{
                        marginRight: props.titleMargin,
                    }}
                >
                    <Typography
                        fontWeight={800}
                        color="#033a55"
                        variant={props.bigTitle ? 'h2' : undefined}
                    >
                        {props.title}
                    </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: colors.primary,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>

            <DialogContent
                style={{
                    width: props.contentWidth,
                    marginRight: 10,
                    marginLeft: 10,
                }}
            >
                {props.body}
            </DialogContent>
            {props.separate && (
                <Stack alignItems="center">
                    <Divider
                        style={{
                            width: '80%',
                            marginTop: 15,
                        }}
                    />
                </Stack>
            )}
            {props.action && (
                <DialogActions
                    style={{
                        flexDirection: props.action.reverse
                            ? 'row-reverse'
                            : 'row',
                    }}
                >
                    <Button
                        color={props.action.reverse ? 'primary' : 'error'}
                        style={{ flex: 1 }}
                        onClick={handleClose}
                    >
                        {props.action.cancel?.label ?? 'Annuler'}
                    </Button>

                    {props.action.submit && (
                        <Button
                            color={props.action.reverse ? 'error' : 'primary'}
                            style={{ flex: 1 }}
                            onClick={handleClick}
                        >
                            {props.action.submit?.label ?? 'Valider'}
                        </Button>
                    )}
                </DialogActions>
            )}
        </DialogMUI>
    );
};

export default Dialog;
