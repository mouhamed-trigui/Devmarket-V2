import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Structure from './structure/Structure';
import StoreDetails from './store/store-details/StoreDetails';
import Offers from '../company/offers/offers';
import FilterOffers from './offers/filter-offer/filter-offer';

import {
    useNavigation,
    StackActions,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { HeaderRight, HeaderTitle } from '../../../components/molecules/header';
import { Atomes } from '../../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddOffer from './offers/add-offre/AddOffre';
import UpdateOffer from './offers/update-offer/EditOffer';
import OffreDetails from './offers/details-offre/OffreDetails';

import StructureEdit from './structure/update-structure/StructureEdit';
import AddStructure from './structure/add-structure/add-structure';

import AddStore from './store/add-store/add-shop';
import UpdateStore from './store/store-edit/StoreEdit';
import aide from '../../../../assets/images/png/aide.png';
import { system } from '../../../theme/colors';

// assets
import shopBleu from '../../../../assets/images/png/shop-bleu-f.png';
import editImage from '../../../../assets/images/png/modif.png';
import optionsImage from '../../../../assets/images/png/options.png';
import BackleftPng from '../../../../assets/images/png/backLeft.png';
import BackleftSvg from '../../../../assets/images/svg/backLeft.svg';
import ChevronLeftSvg from '../../../../assets/images/svg/chevron-left.svg';

import { FormattedMessage } from 'react-intl';
import StoreTimetable from './store/store-edit/store-timetable/StoreTimetable';
import HasPermission from '../../../extensions/permission/HasPermission';
import { Image, Platform, TouchableOpacity } from 'react-native';
import { IconButton } from 'native-base';
import { deleteStore } from '../../../services/methodes';

const Stack = createNativeStackNavigator();

const CompanyScreenNavigator = (props: any) => {
    const navigation = useNavigation();

    const { selectedStore } = useSelector((state: any) => state.company);

    const safeAreaInsets = useSafeAreaInsets();

    const { user } = useSelector((state: any) => state);

    const stackName = ['listOffer', 'updateOffer'];

    // modal state
    const [showModal, setShowModal] = React.useState(false);
    const [activeModal, setActiveModal] = React.useState(false);

    const [first, setFirst] = React.useState<boolean | undefined>(undefined);

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(props?.route);
        if (
            routeName &&
            [
                'AddStructure',
                'AddStore',
                'AddOffer',
                'FilterOffers',
                'UpdateOffer',
                'UpdateStoreTimetable',
            ]?.includes(routeName)
        ) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    backgroundColor: '#003753',
                    borderTopColor: '#003753',
                    height: 60 + safeAreaInsets.bottom,
                },
            });
        }
        return () => {
            if (routeName && !['MyStructures']?.includes(routeName)) {
                navigation.setOptions({ tabBarStyle: { display: 'none' } });
            } else {
                navigation.setOptions({
                    tabBarStyle: {
                        backgroundColor: '#003753',
                        borderTopColor: '#003753',
                        height: 60 + safeAreaInsets.bottom,
                    },
                });
            }
        };
    }, [props?.navigation, props?.route]);

    const handleBack = () => {
        if (user.previousScreenName === 'addOffer') {
            navigation.dispatch(StackActions.pop(2));
        } else if (stackName.includes(user.previousScreenName)) {
            navigation.dispatch(StackActions.pop(1));
        }
    };

    return (
        <Stack.Navigator
            initialRouteName="MyStructures"
            screenOptions={{
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTintColor: '#003753',
            }}
        >
            {/** STRUCTURE STACK */}
            <Stack.Group>
                <Stack.Screen
                    name="MyStructures"
                    options={{
                        headerTitle: () => (
                            <HeaderTitle
                                icon={shopBleu}
                                title="Mes structures"
                                color="#003753"
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <HasPermission to="COMPANY">
                            <Structure {...props} />
                        </HasPermission>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="StructureEdit"
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerStyle: { backgroundColor: 'transparent' },
                        headerTintColor: system[200],
                        headerTitleStyle: { color: 'transparent' },
                        headerTitle: () => (
                            <Atomes.Text
                                fontSize="dm-h2"
                                fontFamily="mono"
                                color={system[200]}
                            >
                                <FormattedMessage
                                    id="NVGPG2"
                                    defaultMessage="Modifier Entreprise"
                                />
                            </Atomes.Text>
                        ),
                    }}
                >
                    {(props) => (
                        <HasPermission to="COMPANY" action="UPDATE">
                            <StructureEdit {...props} />
                        </HasPermission>
                    )}
                </Stack.Screen>

                <Stack.Screen
                    name="AddStructure"
                    options={{
                        headerTransparent: true,
                        headerTintColor: 'white',
                        headerTitle: () => (
                            <Atomes.Text
                                fontSize="dm-h2"
                                fontFamily="mono"
                                color="white"
                            >
                                <FormattedMessage
                                    id="NVGPG3"
                                    defaultMessage="Ajouter une nouvelle entreprise"
                                />
                            </Atomes.Text>
                        ),
                    }}
                >
                    {(props) => (
                        <Atomes.SafeArea>
                            <HasPermission to="COMPANY" action="CREATE">
                                <AddStructure {...props} />
                            </HasPermission>
                        </Atomes.SafeArea>
                    )}
                </Stack.Screen>
                {/** TODO: CHECK STACK NAMR WITH @HAMDI AND @MILADI */}
                <Stack.Screen
                    name="StructureDetails"
                    options={{
                        headerTitle: () => (
                            <HeaderTitle
                                title={selectedStore?.name}
                                color="#003753"
                            />
                        ),
                        headerRight: () => (
                            <HeaderRight
                                iconOption={optionsImage}
                                items={[
                                    {
                                        label: 'Modifier',
                                        onPress: () =>
                                            navigation.navigate('UpdateStore'),
                                    },
                                    {
                                        label: 'Supprimer',
                                        confirmDialog: {
                                            title: 'Supprimer',
                                            message:
                                                'Voulez-vous vraiment supprimer ce boutique ?',
                                        },
                                        onPress: () => {
                                            deleteStore(selectedStore?.id)
                                                .then(() =>
                                                    navigation.navigate(
                                                        'MyStructures'
                                                    )
                                                )
                                                .catch((error) =>
                                                    console.log(error)
                                                );
                                        },
                                    },
                                ]}
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <HasPermission to="STORE">
                            <StoreDetails {...props} />
                        </HasPermission>
                    )}
                </Stack.Screen>
            </Stack.Group>

            {/** STORE STACK */}
            <Stack.Group>
                <Stack.Screen
                    name="AddStore"
                    options={{
                        headerTransparent: true,
                        headerTintColor: 'white',
                        headerTitle: () => (
                            <Atomes.Text
                                fontSize="dm-h2"
                                fontFamily="mono"
                                color="white"
                            >
                                <FormattedMessage
                                    id="NVGPG4"
                                    defaultMessage="Ajouter une nouvelle boutique"
                                />
                            </Atomes.Text>
                        ),
                    }}
                >
                    {(props) => (
                        <Atomes.SafeArea>
                            <HasPermission to="STORE" action="CREATE">
                                <AddStore {...props} />
                            </HasPermission>
                        </Atomes.SafeArea>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="UpdateStore"
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: 'white' },
                        headerBackTitleVisible: false,
                        headerTintColor: '#003753',
                        headerTitle: () => (
                            <Atomes.Text
                                fontSize="dm-h2"
                                fontFamily="mono"
                                color="#003753"
                            >
                                <FormattedMessage
                                    id="NVGPG5"
                                    defaultMessage="Modifier"
                                />
                                {' ' + selectedStore.name}
                            </Atomes.Text>
                        ),
                    }}
                >
                    {(props) => (
                        <HasPermission to="STORE" action="UPDATE">
                            <UpdateStore {...props} />
                        </HasPermission>
                    )}
                </Stack.Screen>

                <Stack.Screen
                    name="UpdateStoreTimetable"
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        headerTintColor: 'white',
                        headerTitle: () => (
                            <Atomes.Text
                                fontSize="dm-h2"
                                fontFamily="mono"
                                color="white"
                            >
                                {'Horaires de ' + selectedStore.name}
                            </Atomes.Text>
                        ),
                    }}
                >
                    {(props) => (
                        <Atomes.SafeArea>
                            <HasPermission to="STORE">
                                <StoreTimetable />
                            </HasPermission>
                        </Atomes.SafeArea>
                    )}
                </Stack.Screen>
            </Stack.Group>
            {/** OFFER STACK */}

            <Stack.Group>
                <Stack.Screen
                    name="OfferList"
                    options={{
                        //presentation: 'fullScreenModal',
                        // headerTransparent: true,
                        headerTintColor: '#003753',
                        headerStyle: {
                            backgroundColor: '#FBFBFB',
                        },

                        headerTitle: () => (
                            <HeaderTitle
                                title="Toutes mes offres"
                                color="#003753"
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <HasPermission to="OFFER">
                            <Offers {...props} />
                        </HasPermission>
                    )}
                </Stack.Screen>

                <Stack.Screen
                    name="AddOffer"
                    options={{
                        headerTransparent: true,
                        headerTintColor: 'white',
                        headerTitle: () => (
                            <Atomes.Text fontSize="dm-h2" fontFamily="mono">
                                <FormattedMessage
                                    id="NVGPG1"
                                    defaultMessage="Ajoute une offre"
                                />
                            </Atomes.Text>
                        ),
                        headerRight: () =>
                            !first && (
                                <HeaderRight
                                    icon={aide}
                                    onPress={() => setShowModal(true)}
                                />
                            ),
                    }}
                >
                    {(props) => (
                        <Atomes.SafeArea>
                            <HasPermission to="OFFER" action="CREATE">
                                <AddOffer
                                    first={first}
                                    setFirst={setFirst}
                                    show={showModal}
                                    setShow={setShowModal}
                                />
                            </HasPermission>
                        </Atomes.SafeArea>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="UpdateOffer"
                    options={{
                        headerTransparent: true,
                        headerTintColor: 'white',
                        headerTitle: () => (
                            <Atomes.Text fontSize="dm-h2" fontFamily="mono">
                                <FormattedMessage
                                    id="NVGPG6"
                                    defaultMessage="Modifier une offre"
                                />
                            </Atomes.Text>
                        ),
                        headerRight: () => (
                            <HeaderRight
                                icon={aide}
                                onPress={() => setActiveModal(true)}
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <Atomes.SafeArea>
                            <HasPermission to="OFFER" action="UPDATE">
                                <UpdateOffer
                                    show={activeModal}
                                    setShow={setActiveModal}
                                />
                            </HasPermission>
                        </Atomes.SafeArea>
                    )}
                </Stack.Screen>

                <Stack.Screen
                    name="OffreDetails"
                    options={{
                        headerStyle: { backgroundColor: system[300] },
                        headerBackVisible: false,
                        headerLeft: () =>
                            Platform.OS === 'web' ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (
                                            user.previousScreenName ===
                                            'addOffer'
                                        ) {
                                            navigation.dispatch(
                                                StackActions.pop(2)
                                            );
                                        } else if (
                                            stackName.includes(
                                                user.previousScreenName
                                            )
                                        ) {
                                            navigation.dispatch(
                                                StackActions.pop(1)
                                            );
                                        }
                                    }}
                                    style={{ width: 40 }}
                                >
                                    <Image
                                        source={BackleftPng}
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                </TouchableOpacity>
                            ) : Platform.OS === 'ios' ? (
                                <IconButton
                                    onPress={handleBack}
                                    icon={
                                        <ChevronLeftSvg
                                            fill={system[50]}
                                            style={{
                                                marginRight: 10,
                                                width: 22,
                                                height: 20,
                                            }}
                                        />
                                    }
                                />
                            ) : (
                                <IconButton
                                    onPress={handleBack}
                                    icon={
                                        <BackleftSvg
                                            fill={system[50]}
                                            style={{
                                                marginRight: 10,
                                                width: 22,
                                                height: 19,
                                            }}
                                        />
                                    }
                                />
                            ),

                        headerTitle: () => (
                            <HeaderTitle title="" color="#003753" />
                        ),
                        headerRight: () => (
                            <HeaderRight
                                icon={editImage}
                                iconOption={optionsImage}
                                onPress={() =>
                                    navigation.navigate('UpdateOffer')
                                }
                            />
                        ),
                    }}
                >
                    {() => (
                        <HasPermission to="OFFER">
                            <OffreDetails />
                        </HasPermission>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="FilterOffers"
                    options={{ headerShown: false }}
                >
                    {() => (
                        <HasPermission to="OFFER">
                            <FilterOffers />
                        </HasPermission>
                    )}
                </Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default CompanyScreenNavigator;
