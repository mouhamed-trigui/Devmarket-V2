import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { act } from 'react-test-renderer';
import { RenderReduxComponent } from '../../../utils/test/RenderRedux';
import { IconButton, IconButtonProps } from './IconButton';

const handleClickMock = jest.fn();
const iconButtonData: IconButtonProps = {
    icon: null,
    index: 0,
    onlyIcon: false,
    completed: false,
    onPress: handleClickMock,
};

it('Test icon button component', () => {
    let iconButtonElement = RenderReduxComponent(
        <IconButton
            icon={iconButtonData.icon}
            index={iconButtonData.index}
            onlyIcon={iconButtonData.onlyIcon}
            completed={iconButtonData.completed}
        />
    );
    const iconButtonInstantElement = iconButtonElement.root;
    expect(iconButtonInstantElement).toBeTruthy();
});

it('Test click on icon button component', async () => {
    let iconButtonElement = RenderReduxComponent(
        <IconButton
            icon={iconButtonData.icon}
            index={iconButtonData.index}
            onlyIcon={iconButtonData.onlyIcon}
            completed={iconButtonData.completed}
            onPress={handleClickMock}
        />
    );
    const iconButtonInstantElement = iconButtonElement.root;
    const touchableOpacityElement = iconButtonInstantElement.findByType(
        TouchableOpacity
    );
    touchableOpacityElement.props.onPress();
    expect(handleClickMock).toBeCalledTimes(1);
});
