import { Badge, Chip, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Dialog from './Dialog';

import { ReactComponent as ChatSvg } from '../../../../assets/svg/chat.svg';
import { colors } from '../../../theme/colors';

interface MessageDialogProps {
    message: string;
    jobs?: Array<string> | null;
}

function MessageDialog({ message, jobs }: MessageDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <>
            <IconButton
                style={{ marginLeft: 5 }}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen((oldState) => !oldState);
                }}
            >
                <Badge variant="standard" badgeContent="1" color="warning">
                    <ChatSvg fill={colors.warning} />
                </Badge>
            </IconButton>
            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxWidth="md"
                fullWidth
                title="Message de l'utilisateur"
                bigTitle
                body={
                    <Stack direction="row" gap={2}>
                        <ChatSvg fill={colors.secondary} />
                        <Stack>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Avant de connaitre Defmarket PRO,
                                Pratiquiez-vous déjà des offres auprès de notre
                                communauté?
                            </Typography>
                            <Typography gutterBottom>{message}</Typography>
                            <Stack direction="row" gap={1}>
                                {jobs?.map((job) => (
                                    <Chip label={job} />
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                }
            />
        </>
    );
}

export default MessageDialog;
