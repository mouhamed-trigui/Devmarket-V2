import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

// Icones PNG
import {
    notifOfferIcon,
    notifShopIcon,
    notifProfilIcon,
    notifCoucouIcon,
    companyIcon,
    close,
} from '../../../theme/images';

// Icones SVG
import {
    NotifOfferIconSVG,
    NotifShopIconSVG,
    NotifProfilIconSVG,
    NotifCoucouIconSVG,
    CompanyIconSVG,
} from '../../../theme/svgs';

//services notifications (get all and delete)
/* import {
    allActivityNotifications,
    deleteNotification,
}  from '../../../services/methodes/notifications';*/

// model
//import { INotificationProps } from '../../../services/model/auth/notification';

import moment from 'moment';

// molecule delete dialog
import Text from '../../../components/atomes/text/Text';
import { fonts } from '../../../theme/fonts';
import { ThemeContext } from '../../../context/ThemeContext';
import { fontSizes } from './../../../theme/fonts';
import { DialogContext } from '../../../components/atomes/dialog';
import HStack from '../../../components/atomes/stack/HStack';

const Notifications = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.info[200],
            flex: 1,
        },
        backTextWhite: {
            color: theme.colors.info[200],
        },
        rowFront: {
            alignItems: 'center',
            backgroundColor: theme.colors.info[200],
            justifyContent: 'center',
            height: 90,
            padding: 10,
            borderTopColor: theme.colors.info[300],
            borderTopWidth: 1,
        },
        rowBack: {
            backgroundColor: '#DDD',
        },
        backRightBtn: {
            alignItems: 'center',
            bottom: 0,
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: 75,
        },
        backRightBtnLeft: {
            backgroundColor: 'blue',
            right: 75,
        },
        backRightBtnRight: {
            right: 0,
        },
    });
    const notificationsInfo = [
        {
            id: 1,
            icon: notifOfferIcon,
            text:
                'Ajoute une offre à ta boutique pour devenir visible auprès de la communauté !',
            date: '04/11/2021 à 16:43',
        },
        {
            id: 2,
            icon: notifShopIcon,
            text: 'Configure ta boutique pour valider ton compte utilisateur',
            date: '04/11/2021 à 16:42',
        },
        {
            id: 3,
            icon: notifProfilIcon,
            text:
                'Complète ton profil pour valider ton badge de membre officiel !',
            date: '04/11/2021 à 16:41',
        },
        {
            id: 4,
            icon: notifCoucouIcon,
            text: 'Bienvenue John ! Bienvenue sur DEFMARKET !',
            date: '04/11/2021 à 16:40',
        },
    ];
    // states page and total pages
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    // list of notifications
    const [listData, setListData] = useState<any[]>([]);

    //const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);

    const { setDialog } = useContext(DialogContext);

    const [openAlert, setOpenAlert] = useState(false);
    // function to set icon according to icontype geted from back
    const getIconFromName = (name: string) => {
        switch (name) {
            case 'OFFER':
                return <NotifOfferIconSVG width={36} height={36} />;

            case 'STORE':
                return <NotifShopIconSVG width={36} height={36} />;

            case 'PROFILE':
                return <NotifProfilIconSVG width={36} height={36} />;

            case 'COMPANY':
                return <CompanyIconSVG width={36} height={36} />;

            case 'WELCOME':
                return <NotifCoucouIconSVG width={36} height={36} />;
        }
    };

    // use Effect (send request to get notifications with specific page and total element )
    useEffect(() => {
        setListData(notificationsInfo);
        /*  allActivityNotifications(page, 15).then((res) => {
                setListData((listData) => [...listData, ...res?.content]);
                setTotalPage(res.totalPages);
                setLoading(false);
            }); */
    }, []);

    // sending again request to get more notifications while scrolling
    const loadMoreNotifications = () => {
        if (totalPage > page && !loading) {
            setLoading(true);
            setPage(page + 1);
        }
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.id === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = (rowKey) => {
        console.log('This row opened', rowKey);
    };

    const renderItem = (data) => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={theme.colors.info[100]}
        >
            <HStack>
                <Image
                    source={data.item.icon}
                    style={{ width: 35, height: 35, marginHorizontal: 10 }}
                />

                <View
                    style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        paddingHorizontal: 5,
                    }}
                >
                    <Text
                        textAlign="left"
                        color={theme.colors.info[50]}
                        numberOfLines={2}
                        fontFamily={fonts.medium}
                        moreParams={{
                            flexGrow: 1,
                        }}
                    >
                        {data.item.text}
                    </Text>
                    <Text
                        textAlign="left"
                        color={theme.colors.primary[50]}
                        fontFamily={fonts.body}
                        fontSize={fontSizes['dm-p']}
                        vPadding={5}
                        numberOfLines={1}
                    >
                        {moment(data.item.createdDate).format(
                            'DD/MM/YYYY à HH:mm'
                        )}
                    </Text>
                </View>
            </HStack>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => {
                setDialog({
                    dialogVisibility: true,
                    title: 'Attention!',
                    message:
                        'Vous allez supprimer cette notification. Êtes-vous sûr? Les données supprimées ne peuvent pas être récupérées.',
                    buttonLeft: 'Oui',
                    buttonRight: 'Non',
                    onPress: () => deleteRow(rowMap, data.item.id),
                });
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#DDD',
                    width: 80,
                    height: 90,
                }}
            >
                <Image
                    source={close}
                    style={{
                        width: 20,
                        height: 20,
                    }}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                backgroundColor: theme.colors.info[200],
                flex: 1,
                flexGrow: 1,
                flexShrink: 1,
                flexWrap: 'nowrap',
                paddingTop: 10,
            }}
        >
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            {(Platform.OS === 'android' || Platform.OS === 'ios') && (
                <View style={{ marginBottom: 50 }} />
            )}
        </View>
    );

    return (
        <View
            style={{
                backgroundColor: theme.colors.info[200],
                flex: 1,
                flexGrow: 1,
                flexShrink: 1,
                flexWrap: 'nowrap',
                paddingTop: 10,
            }}
        >
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            {(Platform.OS === 'android' || Platform.OS === 'ios') && (
                <View style={{ marginBottom: 50 }} />
            )}
        </View>
    );
};

export default Notifications;
