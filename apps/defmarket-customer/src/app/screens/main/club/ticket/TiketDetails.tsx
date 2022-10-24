import React, { useContext, useState } from 'react';
import {
    Alert,
    Platform,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
} from 'react-native';

import TicketDetailsCard from '../../../../components/atomes/card/ticket-card/ticket-details-card';
import PageContainer from '../../../../components/atomes/container/PageContainer';
import HStack from '../../../../components/atomes/stack/HStack';
import Text from '../../../../components/atomes/text/Text';

import { ThemeContext } from '../../../../context/ThemeContext';
import { fonts, fontSizes } from '../../../../theme/fonts';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ActionButtons from '../../../../components/atomes/button/action-button/ActionButtons';
import { useDispatch } from 'react-redux';
import { Plus, Decrease } from '../../../../theme/svgs';
import VStack from '../../../../components/atomes/stack/VStack';
import Button from '../../../../components/atomes/button/general-button/Button';

function TiketDetails(props: any) {
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const { ticket } = props?.route?.params;

    const renderTicketDescription = (description: string) => {
        return (
            description && (
                <View style={{ paddingBottom: 20 }}>
                    <Text
                        color={theme.colors.info[50]}
                        hPadding={4}
                        numberOfLines={30}
                    >
                        {description}
                    </Text>
                </View>
            )
        );
    };

    const renderTicketAddress = (addressData: any) => {
        return (
            addressData && (
                <View style={{ paddingBottom: 20 }}>
                    {addressData?.address && (
                        <Text
                            key={'Storeaddress'}
                            color={theme.colors.info[50]}
                            hPadding={4}
                        >
                            {addressData?.address}
                        </Text>
                    )}
                    {addressData?.geolocation && Platform.OS !== 'web' && (
                        <MapView
                            key={'MapView'}
                            customMapStyle={[]}
                            provider={PROVIDER_GOOGLE}
                            minZoomLevel={15}
                            initialRegion={
                                addressData?.geolocation && {
                                    latitude:
                                        addressData?.geolocation?.latitude,
                                    longitude:
                                        addressData?.geolocation?.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }
                            }
                            style={{
                                marginTop: 10,
                                width: '100%',
                                height: 100,
                                borderRadius: 10,
                            }}
                            showsPointsOfInterest={true}
                        >
                            <Marker
                                key={'MapViewMarker'}
                                coordinate={
                                    addressData?.geolocation && {
                                        latitude:
                                            addressData?.geolocation?.latitude,
                                        longitude:
                                            addressData?.geolocation?.longitude,
                                    }
                                }
                            />
                        </MapView>
                    )}
                </View>
            )
        );
    };

    const sections = [
        {
            title: 'Description détailée',
            childComponent: renderTicketDescription(ticket?.description),
        },
        {
            title: 'Adresse',
            childComponent: renderTicketAddress(ticket?.addressData),
        },
    ];

    // ReservationTicket
    const Helper = (props) => {
        return (
            <View
                style={{
                    ...styles.helper,
                    backgroundColor: theme.colors.secondary[50],
                }}
            >
                <Text
                    fontFamily={fonts.body}
                    fontSize={fontSizes['dm-p']}
                    numberOfLines={2}
                    vPadding={5}
                    hPadding={10}
                >
                    {props.category === 'spectacle'
                        ? 'Choisissez la séance'
                        : 'Saisissez le montant de votre carte cadeau compris entre 0,50€ et 200€'}
                </Text>
            </View>
        );
    };

    // Actions
    const Action = (props) => {
        const [number, onChangeNumber] = React.useState(null);
        return (
            <View>
                {props.category === 'Parcs' ? (
                    <TextInput
                        style={{
                            ...styles.helper,
                            ...styles.input,
                            borderColor: theme.colors.secondary[50],
                            color: theme.colors.secondary[50],
                        }}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="200"
                        keyboardType="numeric"
                    />
                ) : (
                    <Button
                        title={`Réserver sur ${ticket.title}`}
                        backgroundColor={theme.colors.primary[50]}
                        color={theme.colors.info[200]}
                        style={styles.button}
                        onPress={props?.onPress}
                    />
                )}
            </View>
        );
    };
    // Actions Items
    const ActionItem = (props) => {
        const [quantity, setQuantity] = useState(1);
        return (
            <HStack
                style={{
                    paddingLeft: 20,
                    paddingBottom: 20,
                }}
            >
                <HStack style={{ width: '40%' }} justifyContent="space-between">
                    <View
                        style={{
                            backgroundColor: theme.colors.primary[50],
                            padding: 5,
                            marginRight: 20,
                        }}
                    >
                        <Text
                            fontFamily={fonts.bold}
                            fontSize={fontSizes['dm-3p']}
                            color={theme.colors.info[100]}
                            vPadding={5}
                            hPadding={10}
                        >
                            {`-${props?.ticket?.discount}%`}
                        </Text>
                    </View>
                    <VStack>
                        {props?.ticket?.traifTitle && (
                            <Text
                                fontFamily={fonts.body}
                                fontSize={fontSizes['dm-p']}
                                color={theme.colors.info[50]}
                                numberOfLines={1}
                            >
                                {props?.ticket?.traifTitle}
                            </Text>
                        )}

                        <Text
                            fontFamily={fonts.mono}
                            fontSize={fontSizes['dm-3p']}
                            color={theme.colors.info[50]}
                        >
                            {`${(
                                (props?.ticket.prix -
                                    (props?.ticket?.discount / 100) *
                                        props?.ticket.prix) *
                                quantity
                            ).toFixed(2)} €`}
                        </Text>
                    </VStack>
                </HStack>

                <HStack
                    justifyContent="flex-end"
                    style={{ width: '60%', paddingHorizontal: 20 }}
                >
                    {props?.ticket?.quantity <= 0 ? (
                        <View
                            style={{
                                backgroundColor: theme.colors.danger[400],
                                borderRadius: 10,
                                padding: 5,
                            }}
                        >
                            <Text
                                fontFamily={fonts.body}
                                fontSize={fontSizes['dm-3p']}
                                color={theme.colors.danger[100]}
                                vPadding={5}
                                hPadding={10}
                            >
                                Non disponible
                            </Text>
                        </View>
                    ) : (
                        <HStack>
                            <TouchableOpacity
                                onPress={() => {
                                    quantity > 1 && setQuantity(quantity - 1);
                                }}
                            >
                                <Decrease
                                    fill={theme.colors.info[50]}
                                    height={25}
                                    width={25}
                                />
                            </TouchableOpacity>

                            <Text
                                fontFamily={fonts.mono}
                                fontSize={fontSizes['dm-3p']}
                                color={theme.colors.info[50]}
                                hPadding={20}
                            >
                                {`${quantity}`}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setQuantity(quantity + 1);
                                }}
                            >
                                <Plus
                                    fill={theme.colors.info[50]}
                                    height={25}
                                    width={25}
                                />
                            </TouchableOpacity>
                        </HStack>
                    )}
                </HStack>
            </HStack>
        );
    };

    const ReservationTicket = (props) => {
        return (
            <VStack>
                {/* HELPER */}
                <Helper category={ticket.category} />
                {/* ACTION */}
                <Action
                    category={ticket.category}
                    onPress={() => {
                        alert('');
                    }}
                />
                <ActionItem ticket={ticket} />
            </VStack>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <PageContainer
                backgroundColor={theme.colors.info[200]}
                style={{
                    flex: 1,
                }}
            >
                <View style={{ marginBottom: 100 }}>
                    {/* Ticket details */}
                    <TicketDetailsCard ticket={ticket} />

                    {/* Reservation */}
                    <ReservationTicket ticket={ticket} />

                    {/* Sections */}
                    {sections?.map((section, index) => (
                        <View
                            key={index + 1}
                            style={{
                                backgroundColor: theme.colors.info[300],
                                paddingHorizontal: '5%',
                                marginBottom: 5,
                                padding: 10,
                            }}
                        >
                            <Text
                                fontFamily={fonts.mono}
                                fontSize={fontSizes['dm-h3']}
                                color={theme.colors.info[50]}
                                hPadding={4}
                                vPadding={5}
                            >
                                {section.title}
                            </Text>
                            {section.childComponent}
                        </View>
                    ))}
                </View>
            </PageContainer>
            <ActionButtons conciergerie={true} itineraire={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    helper: {
        padding: 3,
        marginRight: 20,
        marginLeft: 20,
        marginTop: -5,
        marginBottom: 15,
        borderRadius: 10,
    },
    input: {
        height: 40,
        width: Dimensions.get('window').width - 40,
        margin: 12,
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 10,
    },
    button: {
        height: 50,
        borderRadius: 8,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 15,
        width: Dimensions.get('window').width - 40,
    },
});

export default TiketDetails;
