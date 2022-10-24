import React, { useState, useEffect } from 'react';
import { Button, Text } from '../../../../../../components/atomes';
import {
    FormControlTextarea,
    RadioGroup,
    FormControl,
} from '../../../../../../components/molecules';

import { FormattedMessage, useIntl } from 'react-intl';
import {
    Divider,
    HStack,
    View,
    VStack,
    IconButton,
    Image,
    KeyboardAvoidingView,
} from 'native-base';
import { Dimensions, Platform } from 'react-native';
import { moreInfo } from '../../../../../../services';
import { SvgXml } from 'react-native-svg';
import addSVG from '../../../../../../../assets/images/svg/bouton-ajouter.svg';
import closePNG from '../../../../../../../assets/images/png/close.png';
import { ScrollView } from 'native-base';

import { useSelector } from 'react-redux';
import { system } from 'apps/defmarket-pro/src/app/theme/colors';

export interface IFirstPageProps {
    setFirst: (isFirst: boolean) => void;
    showDescription?: boolean;
}

export default function FirstPage(props: IFirstPageProps) {
    const [value, setValue] = useState('');
    const [showDescription, setShowDescription] = useState(false);
    const [textValue, settextValue] = useState('');
    const [publicCible, setpublicCible] = useState('');
    const [ListpublicCible, setListpublicCible] = useState<Array<string>>([]);

    const { selectedStore } = useSelector((state: any) => state.company);

    const { formatMessage } = useIntl();

    useEffect(() => {
        if (value === 'Oui') setShowDescription(true);
        else setShowDescription(false);
    }, [value]);

    const OnPressButton = () => {
        showDescription
            ? moreInfo(
                  selectedStore?.id,
                  showDescription,
                  textValue,
                  ListpublicCible.join(';')
              )
                  .then(() => props.setFirst(false))
                  .catch((err) => console.warn(err))
            : props.setFirst(false);
    };

    const handleAddPublicTarget = () => {
        setListpublicCible(ListpublicCible.concat(publicCible));
        setpublicCible('');
    };

    return (
        <KeyboardAvoidingView
            h={{
                base: 'auto',
                lg: 'auto',
            }}
            behavior={'position'}
        >
            <View>
                <VStack space={3} m="5">
                    <Text
                        style={{ paddingLeft: 10 }}
                        fontWeight="medium"
                        fontFamily="body"
                        fontSize="dm-2p"
                        color={'system.200'}
                    >
                        <FormattedMessage
                            id="OFRPG3"
                            defaultMessage="Avant de connaitre Defmarket PRO,\n pratiquais-tu déjà des offres auprès\n de notre communauté ?"
                            values={{
                                br: '\n',
                            }}
                        />
                    </Text>

                    <RadioGroup
                        value={value}
                        label=""
                        name="yesNo"
                        defaultValue=""
                        items={[
                            {
                                label: formatMessage({
                                    id: 'IDQ10s',
                                    description: 'Oui',
                                    defaultMessage: 'Oui',
                                }),
                                value: 'Oui',
                            },
                            {
                                label: formatMessage({
                                    id: 'IDQ11s',
                                    description: 'Non',
                                    defaultMessage: 'Non',
                                }),
                                value: 'Non',
                            },
                        ]}
                        onChange={(value: any) => setValue(value)}
                    />
                </VStack>
                <Divider bg="primary.50" />

                {showDescription ? (
                    <VStack space={3} m="5">
                        <Text
                            style={{ paddingLeft: 10, marginBottom: 10 }}
                            fontWeight="medium"
                            fontFamily="body"
                            fontSize="dm-2p"
                            color={'system.200'}
                        >
                            <FormattedMessage
                                id="OFRPG2"
                                defaultMessage="Chez Defmarket Pro, nous avons à coeur
                                de te faciliter la vie. Afin de pérenniser tes nouvelles habitudes sur notre application, peux-tu nous décrire les offres que tu proposes ? Nous te recontacterons pour les mettre en place rapidement."
                                values={{
                                    br: '\n',
                                }}
                            />
                        </Text>

                        <FormControlTextarea
                            minWidth="105%"
                            label=""
                            value={textValue}
                            placeholder={formatMessage({
                                id: 'OFRPG1',
                                description: 'Ton message',
                                defaultMessage: 'Ton message',
                            })}
                            placeholderTextColor="white"
                            error={null}
                            numberOfLines={10}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) => settextValue(value)}
                        />

                        <FormControl
                            borderColor="white"
                            label={formatMessage({
                                id: 'OSVI01',
                                description:
                                    'Quelles sont tes institutions cibles ?',
                                defaultMessage:
                                    'Quelles sont tes institutions cibles ?',
                            })}
                            type="input"
                            placeholder={formatMessage({
                                id: 'OSVI02',
                                description:
                                    'Écris l’institution puis clique sur +',
                                defaultMessage:
                                    'Écris l’institution puis clique sur +',
                            })}
                            placeholderTextColor="white"
                            helperText={null}
                            value={publicCible}
                            onChange={(value: any) => setpublicCible(value)}
                            InputRightElement={
                                <IconButton
                                    onPress={() =>
                                        publicCible !== ''
                                            ? handleAddPublicTarget()
                                            : {}
                                    }
                                    _pressed={{
                                        opacity: 0.2,
                                        backgroundColor: 'transparent',
                                    }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5,
                                        padding: 15,
                                    }}
                                    alignItems="center"
                                    justifyContent="center"
                                    icon={
                                        <SvgXml
                                            xml={addSVG}
                                            fill="white"
                                            width={20}
                                            height={20}
                                        />
                                    }
                                />
                            }
                        />
                        {ListpublicCible?.length > 0 && (
                            <HStack marginTop={-2}>
                                <ScrollView horizontal={true}>
                                    {ListpublicCible?.map(
                                        (pb: string, indexOfElement) => (
                                            <HStack
                                                margin={1}
                                                key={indexOfElement + 1}
                                                backgroundColor={'system.200'}
                                                alignItems="center"
                                                alignContent={'center'}
                                                justifyContent={'space-between'}
                                                borderRadius={5}
                                            >
                                                <Text
                                                    fontSize={'dm-2p'}
                                                    fontFamily={'body'}
                                                    color={'system.50'}
                                                    moreParams={{
                                                        marginLeft: 3,
                                                    }}
                                                >
                                                    {pb}
                                                </Text>
                                                <IconButton
                                                    marginLeft={2}
                                                    _pressed={{
                                                        opacity: 0.2,
                                                        backgroundColor:
                                                            'transparent',
                                                    }}
                                                    onPress={() =>
                                                        setListpublicCible(
                                                            ListpublicCible.filter(
                                                                (e, index) =>
                                                                    e !== pb
                                                            )
                                                        )
                                                    }
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    icon={
                                                        <Image
                                                            width={18}
                                                            height={18}
                                                            source={closePNG}
                                                            alt="close"
                                                        />
                                                        // <SvgXml width={18} height={18} xml={addSVG} />
                                                    }
                                                />
                                            </HStack>
                                        )
                                    )}
                                </ScrollView>
                            </HStack>
                        )}
                    </VStack>
                ) : (
                    <></>
                )}
                <VStack space={3} m="5">
                    <View marginLeft={1}>
                        <Button
                            maxWidth={
                                Platform?.OS === 'web'
                                    ? '300%'
                                    : Dimensions.get('window').width - 50
                            }
                            label={formatMessage({
                                id: 'UCypUU',
                                description: 'Suivant',
                                defaultMessage: 'Suivant',
                            })}
                            moreParams={{
                                disabled: value === '',
                            }}
                            onPress={OnPressButton}
                        />
                    </View>
                </VStack>
            </View>
        </KeyboardAvoidingView>
    );
}
