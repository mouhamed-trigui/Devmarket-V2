import React from 'react';
import { ViewStyle, Platform, Image, TouchableOpacity } from 'react-native';
import { FormControl } from '../../molecules';
import { useIntl } from 'react-intl';
import { Entypo } from '@expo/vector-icons';
import { Icon } from 'native-base';
import AttacheSVG from '../../../../assets/images/svg/attache.svg';
import InformationBleuPNG from '../../../../assets/images/png/information-bleu.png';
import InformationBleuSVG from '../../../../assets/images/svg/information-bleu.svg';

import { FileType, FileUpload } from '../../../services/model/company';
import * as ImagePickerFile from 'expo-image-picker';
import Infodialog from '../../molecules/dialog/info-dialog/Infodialog';

export interface IFilePicker {
    style?: ViewStyle;
    children?: React.ReactNode;
    onChange: (file: FileType) => void;
    value?: string;
    fileType?: string | string[];
    placeholder?: string;
    placeholderTextColor?: string;
    borderColor?: string;
    information?: boolean;
}

export default function FilePicker(props: IFilePicker) {
    const { formatMessage } = useIntl();
    const [open, setOpen] = React.useState(false);
    const uploadFile = async () => {
        try {
            await ImagePickerFile.launchImageLibraryAsync({
                mediaTypes: ImagePickerFile.MediaTypeOptions.Images,
                allowsEditing: true,
            })
                .then((res) => {
                    if (res.cancelled === false) {
                        const arrayUri = res.uri.split('/');
                        const extensionImage = res.uri.split('.').pop();
                        const mimeType = 'image/' + extensionImage;
                        const file = {
                            name:
                                arrayUri[arrayUri.length - 1] ??
                                'file_' + Math.random() * 100,
                            type: mimeType,
                            uri: res.uri,
                        } as FileUpload;

                        props.onChange(file);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <Infodialog
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Ajoute un justificatif d’identité"
                body="Pour des raisons de sécurité, il est nécessaire que tu renseignes un justificatif d’identité : carte  nationale d’identité, passeport ou permis de conduire."
            />
            <TouchableOpacity
                onPress={uploadFile}
                style={{
                    ...props.style,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <FormControl
                    type="input"
                    placeholder={
                        props.placeholder ??
                        formatMessage({
                            id: 'OSCPG1',
                            description: 'Ajoute une pièce jointe',
                            defaultMessage: 'Ajoute une pièce jointe',
                        })
                    }
                    readOnly
                    placeholderTextColor={props.placeholderTextColor ?? 'white'}
                    borderColor={props.borderColor}
                    helperText={null}
                    value={props.value}
                    InputRightElement={
                        Platform.OS === 'web' ? (
                            <Icon
                                as={<Entypo name="attachment" />}
                                color={props.placeholderTextColor ?? 'white'}
                                size="sm"
                                marginRight={1}
                            />
                        ) : (
                            <AttacheSVG
                                fill={props.placeholderTextColor ?? 'white'}
                                style={{ marginRight: 10, width: 25, height: 25 }}
                            />
                        )
                    }
                    InputLeftElement={
                        props?.information &&
                        (Platform.OS === 'web' ? (
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <Image
                                    source={InformationBleuPNG}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        marginLeft: 5,
                                    }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <InformationBleuSVG style={{ margin: 10 }} />
                            </TouchableOpacity>
                        ))
                    }
                />
            </TouchableOpacity>
        </>
    );
}
