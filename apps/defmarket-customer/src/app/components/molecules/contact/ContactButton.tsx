import React, { useContext } from 'react';
import { View } from 'react-native';
import { Conciergerie } from '../../../theme/svgs';
import { ThemeContext } from '../../../context/ThemeContext';
import IconButton from '../../atomes/icon-button/IconButton';
export default function ContactButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                margin: 25,
            }}
        >
            <IconButton
                icon={
                    <Conciergerie
                        fill={theme.colors.info[200]}
                        height={25}
                        width={25}
                    />
                }
                index={0}
                onlyIcon={true}
                completed={false}
                active={true}
                rounded={true}
                height={50}
                width={50}
                bgColor={theme.colors.primary[100]}
                shadow={true}
            />
        </View>
    );
}
