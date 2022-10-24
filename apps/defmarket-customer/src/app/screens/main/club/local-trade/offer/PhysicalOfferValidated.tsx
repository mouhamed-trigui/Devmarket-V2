import { Image, View } from 'react-native';
import React, { useContext } from 'react';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { restaurant } from '../../../../../theme/images';
import Text from '../../../../../components/atomes/text/Text';
import { fonts, fontSizes } from '../../../../../theme/fonts';
import Badge from '../../../../../components/atomes/badge/Badge';
import VStack from '../../../../../components/atomes/stack/VStack';
import { ReductionCard } from '../../../../../components/atomes/card';
import Button from '../../../../../components/atomes/button/general-button/Button';
import HStack from '../../../../../components/atomes/stack/HStack';
import { Check } from '../../../../../theme/svgs';
import moment from 'moment';
import { IOffer } from '../../../../../services/model/offer';

const PhysicalOfferValidated = ({ navigation, route }) => {
    const { theme } = useContext(ThemeContext);

    const [offer, setOffer] = React.useState<IOffer>();

    React.useEffect(() => {
        setOffer(route.params?.offer);
    }, []);

    const getReductionCardColor = (levelType: string) => {
        switch (levelType) {
            case 'Offre minimum': {
                return theme.colors.info[400];
            }
            case 'Offre medium': {
                return theme.colors.primary[100];
            }
            case 'Offre premium': {
                return theme.colors.primary[50];
            }
            default: {
                return undefined;
            }
        }
    };

    return (
        <PageContainer
            contentContainerStyle={{
                paddingHorizontal: 20,
            }}
        >
            <HStack
                style={{
                    justifyContent: 'center',
                    margin: 10,
                }}
            >
                <Badge
                    text="By Hyperion"
                    width={100}
                    textColor={theme.colors.info[200]}
                    backgroundColor={theme.colors.info[50]}
                />
                <Badge
                    text={offer?.offerCategory}
                    width={100}
                    textColor={theme.colors.info[50]}
                />
                <Badge
                    text={offer?.themeType}
                    width={100}
                    textColor={theme.colors.info[50]}
                />
            </HStack>
            <View
                style={{
                    alignSelf: 'center',
                    width: 230,
                }}
            >
                <Text
                    fontFamily={fonts.bold}
                    fontSize={fontSizes['dm-3p']}
                    color={theme.colors.info[50]}
                    numberOfLines={3}
                    textAlign="center"
                >
                    {offer?.title}
                </Text>
            </View>

            <VStack
                style={{
                    marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <HStack
                    style={{
                        justifyContent: 'center',
                    }}
                >
                    <Check />
                    {offer?.validatedByAdmin && (
                        <Text
                            color={theme.colors.danger[50]}
                            textAlign="center"
                            moreParams={{
                                marginHorizontal: 5,
                            }}
                        >
                            Offre vérifiée
                        </Text>
                    )}
                </HStack>
                <View style={{ width: '100%', marginTop: 10, marginBottom: 5 }}>
                    <ReductionCard
                        onPressActivateCode={() => undefined}
                        validated
                        offerCategory={offer?.offerCategory}
                        cardLevel={route.params?.data}
                        percentage={
                            route.params?.data === 'Offre minimum'
                                ? offer?.minOfferValue
                                : route.params?.data === 'Offre medium'
                                ? offer?.midOfferValue
                                : offer?.maxOfferValue
                        }
                        width="28%"
                        height={90}
                        backgroundColor={getReductionCardColor(
                            route.params?.data
                        )}
                    />
                </View>

                <Text
                    fontFamily={fonts.bold}
                    fontSize={fontSizes['dm-p']}
                    color={theme.colors.info[50]}
                    moreParams={{ alignSelf: 'center', marginTop: 10 }}
                >
                    Conditions
                </Text>
                <Text
                    width={400}
                    numberOfLines={2}
                    textAlign="center"
                    fontFamily={fonts.body}
                    fontSize={13}
                    color={theme.colors.info[50]}
                    moreParams={{ alignSelf: 'center', marginVertical: 10 }}
                >
                    {offer?.description}
                </Text>
                <Text
                    fontFamily={fonts.body}
                    fontSize={fontSizes['dm-p']}
                    color={theme.colors.info[50]}
                    moreParams={{ alignSelf: 'center' }}
                >
                    Du {moment(offer?.startOfOffer).format(' DD/MM/YYYY ')} au{' '}
                    {moment(offer?.endOfOffer).format(' DD/MM/YYYY ')}
                </Text>
                <View
                    style={{
                        marginTop: 20,
                        width: '100%',
                    }}
                >
                    <Image
                        source={restaurant}
                        style={{
                            borderRadius: 8,
                            width: '100%',
                            height: 150,
                            alignSelf: 'center',
                        }}
                    />
                </View>
            </VStack>
            <View style={{ margin: 5 }}>
                <Button
                    title="Utiliser l'offre"
                    backgroundColor={theme.colors.info[50]}
                    color={theme.colors.info[200]}
                    onPress={() => undefined}
                />
            </View>

            <View style={{ marginBottom: 15 }}>
                <Button
                    title="Abandonner"
                    backgroundColor={theme.colors.info[200]}
                    color={theme.colors.info[50]}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </PageContainer>
    );
};

export default PhysicalOfferValidated;
