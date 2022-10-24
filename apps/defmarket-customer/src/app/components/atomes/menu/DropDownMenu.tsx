import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { fonts, fontSizes } from '../../../theme/fonts';
import { Card } from '../card';
import Text from '../text/Text';
function DropDownMenu() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [menuData, setMenuData] = useState([
        { title: "M'y rendre" },
        { title: 'Réclamation' },
        { title: 'Réclamation' },
        { title: 'Réclamation' },
        { title: 'Réclamation123' },
    ]);
    const menuItem = (data) => {
        return (
            <TouchableOpacity
                style={{
                    borderBottomWidth: 1,
                    borderColor: theme.colors.info[700],
                }}
            >
                <Text
                    color={theme.colors.info[50]}
                    fontSize={fontSizes['dm-2p']}
                    fontFamily={fonts.body}
                    vPadding={10}
                    textAlign="center"
                >
                    {data.item.title}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 100,
            }}
        >
            <Card
                borderRadius={7}
                vPadding={10}
                hPadding={5}
                height={200}
                width={150}
            >
                <FlatList
                    data={menuData}
                    renderItem={(item) => menuItem(item)}
                />
            </Card>
        </View>
    );
}

export default DropDownMenu;
