import { Button, Input as InputMUI, Stack, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import attache from '../../../../assets/images/png/attache.png';
import { IDocument } from '../../../services/model/common';

interface IFileProps {
    onChange?: (file: File) => void;
    value?: IDocument | null;
}
const FileUploader: FC<IFileProps> = ({ onChange, value }) => {
    const inputFileRef = React.useRef<any>();

    const [fileName, setFileName] = React.useState<string | undefined>(
        value ? value.name : undefined
    );

    useEffect(() => {
        if (value) setFileName(value.name);
    }, [value]);

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('aaaaa');

        const selectedFile = e.target?.files ? e.target?.files[0] : undefined;
        if (selectedFile) {
            console.log({ selectedFile });

            setFileName(selectedFile.name);
            if (onChange) onChange(selectedFile);
        }
    };

    return (
        <Stack gap={2}>
            <Typography
                fontWeight={600}
                fontSize={13}
                color="black"
                variant="body2"
            >
                Document
            </Typography>
            <input
                ref={inputFileRef}
                hidden
                type="file"
                onChange={uploadFile}
            />

            <Button
                variant="outlined"
                fullWidth
                onClick={(e: any) => inputFileRef.current?.click(e)}
                style={{
                    textTransform: 'none',
                    justifyContent: 'space-between',
                }}
                endIcon={
                    <img
                        src={attache}
                        alt="Profil"
                        width={18}
                        height={15}
                        style={{
                            alignItems: 'center',
                        }}
                    />
                }
            >
                {fileName ? (
                    fileName.split('/').pop()
                ) : (
                    <span>Ajouter une pièce jointe</span>
                )}
            </Button>
        </Stack>
    );
};

export default FileUploader;
