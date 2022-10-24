import React, { useContext } from 'react';
import Annonces from './Annonces';
import Notifications from './Notifications';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../../components/atomes/text/Text';
import { ThemeContext } from '../../../context/ThemeContext';
import { fonts } from '../../../theme/fonts';
import { fontSizes } from './../../../theme/fonts';
import ActionButtons from '../../../components/atomes/button/action-button/ActionButtons';
import Ticket from '../club/ticket/Ticket';

const Activity = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const renderScene = SceneMap({
        first: Annonces,
        second: Notifications,
    });
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Annonces' },
        { key: 'second', title: 'Notifications' },
    ]);
    return (
        <View style={{ flex: 1 }}>
            <TabView
                style={{
                    backgroundColor: theme.colors.info[200],
                }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                renderTabBar={(props) => {
                    const inputRange = props.navigationState.routes.map(
                        (x, i) => i
                    );
                    return (
                        <View
                            key={props.navigationState.index}
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            {props.navigationState.routes.map((route, i) => {
                                const opacity = props.position.interpolate({
                                    inputRange,
                                    outputRange: inputRange.map((inputIndex) =>
                                        inputIndex === i ? 1 : 0.5
                                    ),
                                });

                                return (
                                    <TouchableOpacity
                                        key={route.title}
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            padding: 16,
                                            marginHorizontal: '5%',
                                            backgroundColor:
                                                theme.colors.info[200],
                                            borderBottomColor:
                                                theme.colors.primary[50],
                                            borderBottomWidth:
                                                index === i ? 4 : 0,
                                        }}
                                        onPress={() => setIndex(i)}
                                    >
                                        <Text
                                            fontFamily={
                                                index === i
                                                    ? fonts.mono
                                                    : fonts.body
                                            }
                                            color={
                                                index === i
                                                    ? theme.colors.primary[50]
                                                    : theme.colors.info[50]
                                            }
                                            moreParams={{
                                                fontSize:
                                                    index === i
                                                        ? fontSizes['dm-2p']
                                                        : fontSizes['dm-p'],
                                            }}
                                        >
                                            {route.title}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    );
                }}
            />
            <ActionButtons conciergerie={true} />
        </View>
    );
};

export default Activity;
