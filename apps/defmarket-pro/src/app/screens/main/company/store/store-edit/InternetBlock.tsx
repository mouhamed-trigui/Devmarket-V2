import { Box, Checkbox, HStack, VStack, Image, Center } from 'native-base';
import React, { useState } from 'react';
import { FormControl } from '../../../../../components/molecules';
import { system, primary } from '../../../../../theme/colors';
import {
    ISocialMediaProps,
    IStoreProps,
} from '../../../../../services/model/company';
import Title from '../../../../../components/molecules/store-title/Title';

// assets
import internetPng from '../../../../../../assets/images/png/internet.png';
import addBtnPng from '../../../../../../assets/images/png/bouton-ajouter-blue.png';

import { Text } from '../../../../../components/atomes';
import Select from '../../../../../components/molecules/icon-selector/Select';
import Chip from '../../../../../components/molecules/chip/Chip';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Platform, TouchableOpacity } from 'react-native';
import { FormattedMessage } from 'react-intl';

export const getSocialMediaIconName = (socialMediaName: string) => {
    switch (socialMediaName.toLowerCase()) {
        case 'facebook':
            return 'logo-facebook';
        case 'twitter':
            return 'logo-twitter';
        case 'instagram':
            return 'logo-instagram';
        case 'linkedin':
            return 'logo-linkedin';
        case 'youtube':
            return 'logo-youtube';
        default:
            return 'globe-outline';
    }
};

interface InternetBlockProps {
    store: IStoreProps;
    setStore: React.Dispatch<React.SetStateAction<IStoreProps>>;
    isRequired?: boolean;
}

const InternetBlock = (props: InternetBlockProps) => {
    const [newSocialMedia, setNewSocialMedia] = useState<{
        name: string;
        type: string;
    }>({ name: '', type: 'FACEBOOK' });

    const [
        selectedSocialMediaIndex,
        setSelectedSocialMediaIndex,
    ] = useState<number>();

    const handleSocialMediaAdd = () => {
        if (['', undefined].includes(newSocialMedia.name)) {
            return;
        }

        if (props.store.socialMedia === undefined) {
            props.setStore((old) => ({
                ...old,
                socialMedia: [
                    { type: newSocialMedia.type, value: newSocialMedia.name },
                ],
            }));
        } else {
            props.setStore((old) => ({
                ...old,
                socialMedia: [
                    ...old.socialMedia,
                    { type: newSocialMedia.type, value: newSocialMedia.name },
                ],
            }));
        }
        setNewSocialMedia({ name: '', type: 'FACEBOOK' });
    };

    const handleSocialMediaRemove = (socialMedia: ISocialMediaProps) => {
        props.setStore((old) => ({
            ...old,
            socialMedia: old.socialMedia.filter(
                (sm) =>
                    sm.value !== socialMedia.value &&
                    sm.type !== socialMedia.type
            ),
        }));

        if (socialMedia.id !== undefined) {
            const id: number = socialMedia.id;
            props.setStore((old) => ({
                ...old,
                socialMediaToRemove:
                    old.socialMediaToRemove === undefined
                        ? [id]
                        : [...old.socialMediaToRemove, id],
            }));
        }
    };

    return (
        <Box
            key="internet"
            backgroundColor={system[300]}
            paddingX={5}
            paddingY={8}
        >
            <Title icon={internetPng} title="Site web et réseaux sociaux" />

            <VStack marginY={3}>
                <Checkbox
                    isChecked={props.store?.website?.public}
                    onChange={() =>
                        props.setStore((old) => ({
                            ...old,
                            website: {
                                ...old.website,
                                public: !old?.website?.public,
                            },
                        }))
                    }
                    value={''}
                    alignSelf="center"
                    borderRadius={10}
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                >
                    <Text color={system[50]} style={{ marginLeft: 10 }}>
                        <FormattedMessage
                            id="Intblo"
                            defaultMessage="Ma structure n'a pas de site web"
                        />
                    </Text>
                </Checkbox>
            </VStack>
            <FormControl
                isRequired={props.isRequired}
                keyboardType="url"
                borderColor={primary[50]}
                type="input"
                placeholder="Ajoute un site web"
                placeholderTextColor={primary[50]}
                helperText={null}
                value={props.store?.website?.value ?? ''}
                onChange={(value: string) =>
                    props.setStore((old) => ({
                        ...old,
                        website: { ...old.website, value },
                    }))
                }
            />

            {props.store?.socialMedia !== undefined && (
                <HStack space={2} paddingY={0} flexWrap="wrap">
                    {props.store.socialMedia.map((socialMedia, index) => (
                        <Chip
                            style={{ marginTop: 5 }}
                            icon={
                                <Ionicons
                                    name={getSocialMediaIconName(
                                        socialMedia.type
                                    )}
                                />
                            }
                            onPress={() =>
                                selectedSocialMediaIndex === index
                                    ? setSelectedSocialMediaIndex(undefined)
                                    : setSelectedSocialMediaIndex(index)
                            }
                            selected={index === selectedSocialMediaIndex}
                            label={socialMedia.value}
                            onClose={() => handleSocialMediaRemove(socialMedia)}
                        />
                    ))}
                </HStack>
            )}

            <VStack>
                <FormControl
                    onSubmitEditing={
                        selectedSocialMediaIndex !== undefined
                            ? () => setSelectedSocialMediaIndex(undefined)
                            : handleSocialMediaAdd
                    }
                    key={'newSocialMedia'}
                    keyboardType="url"
                    borderColor={primary[50]}
                    type="input"
                    placeholder="Nom d'utilisateur du compte"
                    placeholderTextColor={primary[50]}
                    helperText={null}
                    value={
                        selectedSocialMediaIndex !== undefined
                            ? props.store.socialMedia[selectedSocialMediaIndex]
                                  .value
                            : newSocialMedia?.name
                    }
                    onChange={(value: string) =>
                        selectedSocialMediaIndex !== undefined
                            ? props.setStore((old) => ({
                                  ...old,
                                  socialMedia: old.socialMedia.map(
                                      (sm, index) =>
                                          index === selectedSocialMediaIndex
                                              ? { ...sm, value }
                                              : sm
                                  ),
                              }))
                            : setNewSocialMedia((old) => ({
                                  ...old,
                                  name: value,
                              }))
                    }
                    InputRightElement={
                        <HStack alignItems="center">
                            {/* <Icon
                            as={<Ionicons name="arrow-forward" />}
                            size="sm"
                            color={primary[50]}
                            onPress={
                                selectedSocialMediaIndex !== undefined
                                    ? () =>
                                          setSelectedSocialMediaIndex(undefined)
                                    : handleSocialMediaAdd
                            }
                        /> */}
                            <Select
                                onChange={(value: string) =>
                                    selectedSocialMediaIndex !== undefined
                                        ? props.setStore((old) => ({
                                              ...old,
                                              socialMedia: old.socialMedia.map(
                                                  (sm, index) =>
                                                      index ===
                                                      selectedSocialMediaIndex
                                                          ? {
                                                                ...sm,
                                                                type: value,
                                                            }
                                                          : sm
                                              ),
                                          }))
                                        : setNewSocialMedia((old) => ({
                                              ...old,
                                              type: value,
                                          }))
                                }
                                value={
                                    selectedSocialMediaIndex !== undefined
                                        ? props.store.socialMedia[
                                              selectedSocialMediaIndex
                                          ].type
                                        : newSocialMedia?.type
                                }
                                items={[
                                    {
                                        name: 'Facebook',
                                        iconName: 'logo-facebook',
                                        value: 'FACEBOOK',
                                    },
                                    {
                                        name: 'Instagram',
                                        iconName: 'logo-instagram',
                                        value: 'INSTAGRAM',
                                    },
                                    {
                                        name: 'Twitter',
                                        iconName: 'logo-twitter',
                                        value: 'TWITTER',
                                    },
                                    {
                                        name: 'Linkedin',
                                        iconName: 'logo-linkedin',
                                        value: 'LINKEDIN',
                                    },
                                    {
                                        name: 'Youtube',
                                        iconName: 'logo-youtube',
                                        value: 'YOUTUBE',
                                    },
                                    {
                                        name: 'Autre',
                                        iconName: 'globe-outline',
                                        value: 'OTHER',
                                    },
                                ]}
                            />
                        </HStack>
                    }
                />
                {
                    <Center marginTop={3}>
                        <TouchableOpacity
                            onPress={
                                selectedSocialMediaIndex !== undefined
                                    ? () =>
                                          setSelectedSocialMediaIndex(undefined)
                                    : handleSocialMediaAdd
                            }
                        >
                            <Image
                                alt="add-button"
                                source={addBtnPng}
                                style={{ width: 25, height: 25 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </Center>
                }
            </VStack>
        </Box>
    );
};

export default InternetBlock;
