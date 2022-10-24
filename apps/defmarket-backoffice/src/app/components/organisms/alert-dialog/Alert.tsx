import { Typography } from '@mui/material';
import { colors } from '../../../theme/colors';
import Dialog from '../../molecules/dialog/Dialog';

export interface IAlertDialog {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    body: string;
}

const Alert: React.FC<IAlertDialog> = ({ isOpen, onClose, title, body }) => {
    return (
        <Dialog
            titleMargin={33}
            maxWidth="xs"
            isOpen={isOpen}
            title={title}
            body={
                <Typography align="center" fontSize={13} color={colors.primary}>
                    {body}
                </Typography>
            }
            onClose={onClose}
            action={{
                cancel: { label: 'OK' },
            }}
        />
    );
};

export default Alert;
