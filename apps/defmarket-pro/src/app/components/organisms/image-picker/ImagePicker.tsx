import React from 'react';
import { View } from 'native-base';
import { Image, TouchableOpacity, ViewStyle } from 'react-native';
import { FileType, FileUpload } from '../../../services/model/company';
import * as ImagePickerFile from 'expo-image-picker';

export interface IImagePickerProps {
    style?: ViewStyle;
    children?: React.ReactNode;
    onChange: (img: FileType) => void;
    value?: string;
    successOverView?: React.ReactNode;
}

const ImagePicker = (props: IImagePickerProps) => {
    const [imageSource, setImageSource] = React.useState(props.value);
    const uploadFile = async () => {
        // Opening Document Picker to select one file
        try {
            await ImagePickerFile.launchImageLibraryAsync({
                mediaTypes: ImagePickerFile.MediaTypeOptions.Images,
                allowsEditing: true,
            })
                .then((res: any) => {
                    if (res.cancelled === false) {
                        const arrayUri = res.uri.split('/');
                        setImageSource(res.uri);
                        const extensionImage = res.uri.split('.').pop();
                        const mimeType = 'image/' + extensionImage;
                        const file = {
                            name:
                                arrayUri[arrayUri.length - 1] ??
                                'image_' + Math.random() * 100,
                            type: mimeType,
                            uri: res.uri,
                        } as FileUpload;

                        props.onChange(file);
                    }
                })
                .catch((err: any) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <TouchableOpacity
            onPress={uploadFile}
            style={{ ...props.style, overflow: 'hidden' }}
        >
            {imageSource ? (
                <View
                    key="ImagePickerView"
                    width="100%"
                    height="100%"
                    alignItems="center"
                    position="relative"
                >
                    <View
                        key="ImageView"
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                    >
                        <Image
                            accessibilityLabel="ImagePicker"
                            source={{ uri: imageSource }}
                            style={{
                                position: 'absolute',
                                top: -1,
                                left: -1,
                                bottom: -1,
                                right: -1,
                            }}
                        />
                    </View>

                    {props.successOverView}
                </View>
            ) : (
                props.children
            )}
        </TouchableOpacity>
    );
};

export default ImagePicker;
