import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { act } from 'react-test-renderer';
import { RenderReduxComponent } from '../../../../utils/test/RenderRedux';
import SmallCard, { SmallCardProps } from './SmallCard';

const handleClickMock = jest.fn();
const smallCardData: SmallCardProps = {
    title: 'Mes favoris',
    icon: undefined,
    path: 'Favoris',
    onPress: handleClickMock,
};

it('Test small card component', () => {
    let smallCardElement = RenderReduxComponent(
        <SmallCard
            title={smallCardData.title}
            icon={smallCardData.icon}
            path={smallCardData.path}
            onPress={handleClickMock}
        />
    );
    const smallCardInstantElement = smallCardElement.root;
    const textElement = smallCardInstantElement.findByType(Text);
    expect(textElement.props.children).toBe(smallCardData.title);
});

it('Test click on small card component', async () => {
    let smallCardElement = RenderReduxComponent(
        <SmallCard
            title={smallCardData.title}
            icon={smallCardData.icon}
            path={smallCardData.path}
            onPress={handleClickMock}
        />
    );
    const smallCardInstantElement = smallCardElement.root;
    const touchableOpacityElement = smallCardInstantElement.findByType(
        TouchableOpacity
    );
    touchableOpacityElement.props.onPress();
    expect(handleClickMock).toBeCalledTimes(1);
});
