import { Stack } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { getFileURL } from '../../../services/methodes/common/file';

interface IImageProps {
    style?: React.CSSProperties;
    onChange?: (img: File) => void;
    value?: number;
    successOverView?: React.ReactNode;
}

const ImageUploader: FC<IImageProps> = ({
    style,
    children,
    onChange,
    value,
    successOverView,
}) => {
    const inputFileRef = React.useRef<any>();

    const [imageURL, setImageURL] = React.useState<string | undefined>(
        value ? getFileURL(value) : undefined
    );

    useEffect(() => {
        if (value) {
            setImageURL(getFileURL(value));
        } else {
            setImageURL(undefined);
        }
    }, [value]);

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target?.files ? e.target?.files[0] : undefined;
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (ev) =>
                setImageURL(
                    typeof ev.target?.result === 'string'
                        ? ev.target?.result
                        : undefined
                );
            reader.readAsDataURL(selectedImage);

            if (onChange) onChange(selectedImage);
        }
    };
    return (
        <Stack
            position="relative"
            style={{ ...style, cursor: 'pointer' }}
            onClick={(e: any) => inputFileRef.current?.click(e)}
        >
            <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={uploadImage}
                ref={inputFileRef}
            />

            {imageURL ? (
                <>
                    <img
                        src={imageURL}
                        alt="Profil"
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                    {successOverView}
                </>
            ) : (
                children
            )}
        </Stack>
    );
};

export default ImageUploader;
