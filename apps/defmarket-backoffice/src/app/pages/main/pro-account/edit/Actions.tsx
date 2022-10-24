import { Button, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import Input from '../../../../components/atoms/form/input/Input';
import Dialog from '../../../../components/molecules/dialog/Dialog';

interface IActionsProps {
    block: {
        onClick: (block: boolean, reason: string) => void;
        isBlocked?: boolean;
        label?: { block?: string; unblock?: string };
    };
    validate?: { onClick: () => void; label?: string };
    showValidate?: boolean;
    update?: { onClick: () => void; label?: string };
    isDisabled?: boolean;
}

const Actions: React.FC<IActionsProps> = ({
    block,
    validate,
    showValidate,
    update,
    isDisabled,
}) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [reason, setReason] = useState('');

    const label = useMemo(
        () =>
            block?.isBlocked
                ? block.label?.unblock ?? 'Débloquer'
                : block.label?.block ?? 'Bloquer',
        [block?.isBlocked, block.label?.block, block.label?.unblock]
    );

    return (
        <Stack direction="row" gap={1} marginTop={1} justifyContent="flex-end">
            <Dialog
                isOpen={dialogIsOpen}
                onClose={() => setDialogIsOpen(false)}
                title={'Spécifiez la raison'}
                body={
                    <Stack>
                        <Input
                            value={reason}
                            onChange={(value) => setReason(value)}
                            label="Raison"
                            multiline
                            rows={3}
                        />
                    </Stack>
                }
                maxWidth="xs"
                fullWidth
                action={{
                    reverse: true,
                    submit: block.isBlocked
                        ? {
                              onClick: () => {
                                  block.onClick(false, reason);
                                  setDialogIsOpen(false);
                                  setReason('');
                              },
                              label: label,
                          }
                        : {
                              onClick: () => {
                                  block.onClick(true, reason);
                                  setDialogIsOpen(false);
                                  setReason('');
                              },
                              label: label,
                          },
                }}
            />
            <Button
                disabled={isDisabled}
                variant="text"
                color="error"
                onClick={() => setDialogIsOpen(true)}
            >
                {label}
            </Button>
            {showValidate && (
                <Button
                    disabled={isDisabled}
                    variant="contained"
                    color="secondary"
                    onClick={validate?.onClick}
                >
                    {validate?.label ?? 'Valider'}
                </Button>
            )}
            {update && (
                <Button
                    disabled={isDisabled}
                    variant="contained"
                    color="warning"
                    onClick={update?.onClick}
                >
                    {update?.label ?? 'Mettre à jour'}
                </Button>
            )}
        </Stack>
    );
};

export default Actions;
