import { Dimensions, Image, ImageSourcePropType, Platform } from 'react-native';

export const getHeight = (
    img: ImageSourcePropType,
    newWidth: number = Dimensions.get('screen').width - 40
) => {
    if (Platform.OS === 'web') return 'auto';

    const { height, width } = Image.resolveAssetSource(img);

    return (newWidth / width) * height;
};

export const getWidth = (img: ImageSourcePropType, newHeight: number) => {
    if (Platform.OS === 'web') return 'auto';
    const { height, width } = Image.resolveAssetSource(img);
    return (newHeight / height) * width;
};
