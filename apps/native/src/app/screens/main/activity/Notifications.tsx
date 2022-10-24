import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Box, Heading, HStack, Icon, Pressable, Spinner } from 'native-base';
import { Text } from '../../../components/atomes';
import { MaterialIcons } from '@expo/vector-icons';

// Icones PNG
import notifOfferIcon from '../../../../assets/images/png/notif-offre.png';
import notifShopIcon from '../../../../assets/images/png/notif-shop.png';
import notifProfilIcon from '../../../../assets/images/png/notif-profil.png';
import notifCoucouIcon from '../../../../assets/images/png/notif-coucou.png';
import companyIcon from '../../../../assets/images/png/company-icon.png';
import NoNotifications from '../../../../assets/images/illustration/no-notifications.png';

// Icones SVG
import NotifOfferIconSVG from '../../../../assets/images/svg/notif-offre.svg';
import NotifShopIconSVG from '../../../../assets/images/svg/notif-shop.svg';
import NotifProfilIconSVG from '../../../../assets/images/svg/notif-profil.svg';
import NotifCoucouIconSVG from '../../../../assets/images/svg/notif-coucou.svg';
import CloseIcon from '../../../../assets/images/svg/close.svg';
import CompanyIconSVG from '../../../../assets/images/svg/company-icon.svg';

//services notifications (get all and delete)
import {
    allActivityNotifications,
    deleteNotification,
} from '../../../services/methodes/notifications';

// model
import { INotificationProps } from '../../../services/model/auth/notification';

import moment from 'moment';

// molecule delete dialog
import DeleteDialog from '../../../components/molecules/dialog/delete-dialog/DeleteDialog';

//colors
import { primary, system } from '../../../theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

const Notifications = () => {
    // states page and total pages
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    const navigation = useNavigation();
    // list of notifications
    const [listData, setListData] = useState<INotificationProps[]>([]);

    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    // function to set icon according to icontype geted from back
    const getIconFromName = (name: string) => {
        switch (name) {
            case 'OFFER':
                return Platform.OS === 'web' ? (
                    notifOfferIcon
                ) : (
                    <NotifOfferIconSVG width={36} height={36} />
                );

            case 'STORE':
                return Platform.OS === 'web' ? (
                    notifShopIcon
                ) : (
                    <NotifShopIconSVG width={36} height={36} />
                );

            case 'PROFILE':
                return Platform.OS === 'web' ? (
                    notifProfilIcon
                ) : (
                    <NotifProfilIconSVG width={36} height={36} />
                );

            case 'COMPANY':
                return Platform.OS === 'web' ? (
                    companyIcon
                ) : (
                    <CompanyIconSVG width={36} height={36} />
                );

            case 'WELCOME':
                return Platform.OS === 'web' ? (
                    notifCoucouIcon
                ) : (
                    <NotifCoucouIconSVG width={36} height={36} />
                );
        }
    };

    // use Effect (send request to get notifications with specific page and total element )
    useEffect(() => {
        if (isFocused) {
            allActivityNotifications(page, 15).then((res) => {
                setListData((listData) => [...listData, ...res?.content]);
                setTotalPage(res.totalPages);
                setLoading(false);
            });
        } else {
            setPage(0);
            setListData([]);
            setLoading(true);
        }
    }, [isFocused, page]);

    useEffect(() => {
        return () => {
            if (isFocused) {
                setPage(0);
                setListData([]);
                setLoading(true);
            }
        };
    }, [isFocused]);

    // sending again request to get more notifications while scrolling
    const loadMoreNotifications = () => {
        if (totalPage > page && !loading) {
            setLoading(true);
            setPage(page + 1);
        }
    };

    const closeRow = (rowMap: any, rowKey: string | number) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    // Delete notification
    const deleteRow = (rowMap: any, rowKey: any) => {
        deleteNotification(rowMap.item.id);
        if (rowMap) closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(
            (item) => item.id === rowMap.item.id
        );

        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const renderItem = (props: { item: INotificationProps; index: number }) => (
        <Box key={props.item.id}>
            <Pressable bg="white">
                <Box
                    pl="4"
                    pr="2"
                    py="2"
                    borderTopWidth="1"
                    borderTopColor="#F6F6F7"
                >
                    <HStack alignItems="center" space={3} flexGrow={1}>
                        {Platform.OS === 'web' ? (
                            <Image
                                source={getIconFromName(props.item.iconType)}
                                style={{ width: 50, height: 50 }}
                            />
                        ) : (
                            getIconFromName(props.item.iconType)
                        )}
                        <Box flexGrow={1} flexShrink={1}>
                            <Text
                                bold
                                style={{ flexGrow: 1 }}
                                color={system[50]}
                                textAlign="left"
                            >
                                {props.item.message}
                            </Text>
                            <Text color={primary[50]} textAlign="left">
                                {moment(props.item.createdDate).format(
                                    'DD/MM/YYYY à HH:mm'
                                )}
                            </Text>
                        </Box>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    );

    const renderHiddenItem = (data: any, rowMap: any) => (
        <DeleteDialog
            body="Vous allez supprimer cette notification. Êtes-vous sûr? Les données supprimées ne peuvent pas être récupérées."
            onPress={() => deleteRow(data, data.item.key)}
            key={data.item.id}
        >
            <Pressable
                w="70"
                flexGrow={1}
                ml="auto"
                bg="#E8E8E8"
                justifyContent="center"
                alignItems="center"
                _pressed={{
                    opacity: 0.5,
                }}
            >
                {Platform.OS === 'web' ? (
                    <Icon
                        as={<MaterialIcons name="close" />}
                        color="#003753"
                        size="xl"
                    />
                ) : (
                    <CloseIcon fill="#003753" />
                )}
            </Pressable>
        </DeleteDialog>
    );

    return (
        <>
            {listData.length > 0 ? (
                <SwipeListView
                    keyExtractor={(item, index) => String(index)}
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-70}
                    previewRowKey={'0'}
                    previewOpenValue={-30}
                    previewOpenDelay={3000}
                    disableRightSwipe={true}
                    onMomentumScrollEnd={loadMoreNotifications}
                    refreshing={loading}
                />
            ) : listData.length === 0 && !loading ? (
                <ScrollView
                    contentContainerStyle={{
                        height: '100%',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        accessibilityLabel={'no-notifications'}
                        source={NoNotifications}
                        style={{
                            width: '70%',
                            height: '45%',
                            alignSelf: 'center',
                            //marginTop: -5,
                        }}
                        resizeMode="contain"
                    />
                    <Text
                        fontSize="dm-3p"
                        fontFamily="body"
                        color="#575D6A"
                        textAlign="center"
                        moreParams={{
                            marginTop: 8,
                        }}
                    >
                        <FormattedMessage
                            id="NONOTIF"
                            defaultMessage="Il n'y a pas de notifications"
                        />
                    </Text>
                </ScrollView>
            ) : (
                <View style={{ height: '45%' }}></View>
            )}
            {loading && (
                <HStack
                    space={2}
                    justifyContent="center"
                    style={{ marginBottom: 10, marginTop: 5 }}
                >
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Chargement
                    </Heading>
                </HStack>
            )}
        </>
    );
};

export default Notifications;
