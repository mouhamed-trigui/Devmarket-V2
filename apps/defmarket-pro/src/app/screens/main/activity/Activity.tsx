import React from 'react';
import Annonces from './Annonces';
import Notifications from './Notifications';
import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';
import { Animated, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import Constants from 'expo-constants';
import Text from '../../../components/atomes/text/text';

const Activity = () => {
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
        <TabView
            style={{
                backgroundColor: '#fff',
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
                                        backgroundColor: 'white',
                                        borderBottomColor: '#00AAC7',
                                        borderBottomWidth: index === i ? 4 : 0,
                                    }}
                                    onPress={() => setIndex(i)}
                                >
                                    <Text
                                        fontSize={
                                            index === i ? 'dm-h2' : 'dm-2p'
                                        }
                                        fontFamily={
                                            index === i ? 'mono' : 'body'
                                        }
                                        style={{
                                            color:
                                                index === i
                                                    ? '#00AAC7'
                                                    : '#003753',
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
    );
};

export default Activity;
