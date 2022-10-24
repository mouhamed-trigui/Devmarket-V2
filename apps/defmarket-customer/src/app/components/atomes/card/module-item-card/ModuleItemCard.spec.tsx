import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { act } from 'react-test-renderer';
import { RenderReduxComponent } from '../../../../utils/test/RenderRedux';
import ModuleItemCard, { ModuleItemCardProps } from './ModuleItemCard';

const handleClickMock = jest.fn();
const moduleCardData: ModuleItemCardProps = {
    title: 'Billetterie',
    description: 'Lorem ipsum lorem ipsum',
    icon: null,
    path: 'Home',
    onPress: handleClickMock,
};

it('Test module card component', () => {
    let moduleCardElement = RenderReduxComponent(
        <ModuleItemCard
            title={moduleCardData.title}
            description={moduleCardData.description}
            icon={moduleCardData.icon}
            path={moduleCardData.path}
            onPress={handleClickMock}
        />
    );
    const moduleCardInstantElement = moduleCardElement.root;
    const textElements = moduleCardInstantElement.findAllByType(Text);
    expect(textElements[0].props.children).toBe(moduleCardData.title);
    expect(textElements[1].props.children).toBe(moduleCardData.description);
});

it('Test click on card component', async () => {
    let moduleCardElement = RenderReduxComponent(
        <ModuleItemCard
            title={moduleCardData.title}
            description={moduleCardData.description}
            icon={moduleCardData.icon}
            path={moduleCardData.path}
            onPress={handleClickMock}
        />
    );

    const moduleCardInstantElement = moduleCardElement.root;
    const touchableOpacityElement = moduleCardInstantElement.findByType(
        TouchableOpacity
    );
    touchableOpacityElement.props.onPress();
    expect(handleClickMock).toBeCalledTimes(1);
});
