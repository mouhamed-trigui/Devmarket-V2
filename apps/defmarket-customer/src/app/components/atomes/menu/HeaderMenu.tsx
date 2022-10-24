import React, { FC, useContext } from 'react';
import { View } from 'react-native';
import { Divider, Menu } from 'react-native-paper';
import { ThemeContext } from '../../../context/ThemeContext';
import Text from '../text/Text';

const HeaderMenu: FC<{
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    anchor:
        | React.ReactNode
        | {
              x: number;
              y: number;
          };
    items: [
        {
            title: string;
            onPressItem: () => void;
        }
    ];
}> = ({ visible, anchor, setVisible, items }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={anchor}
            contentStyle={{
                top: -20,
                right: 0,
                borderRadius: 10,
            }}
        >
            {items &&
                items.map((item, index) => (
                    <View key={`header-item ${index}`}>
                        <Menu.Item
                            key={'menu' + index}
                            titleStyle={{
                                alignSelf: 'center',
                            }}
                            onPress={item.onPressItem}
                            title={
                                <Text color={theme.colors.info[50]}>
                                    {item.title}
                                </Text>
                            }
                        />

                        {index >= 0 && index < items.length - 1 ? (
                            <Divider
                                key={'divider' + index}
                                style={{
                                    borderWidth: 1,
                                    borderColor: theme.colors.info[300],
                                }}
                            />
                        ) : (
                            <></>
                        )}
                    </View>
                ))}
        </Menu>
    );
};

export default HeaderMenu;
