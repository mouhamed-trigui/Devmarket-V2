import React, { ReactElement, useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { fonts } from '../../../theme/fonts';
import { ChevronPlein } from '../../../theme/svgs';
import { ThemeContext } from '../../../context/ThemeContext';
import HStack from '../stack/HStack';
import Text from '../text/Text';
import { fontSizes } from '../../../theme/fonts';
export interface AccordionProps {
    sections: [
        {
            title?: string;
            icon?: ReactElement | any;
            childComponent: ReactElement | any;
        }
    ];
}
function AccordionComponent(props: AccordionProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const sections = props.sections;
    const [activeSections, setActiveSections] = useState(
        sections.map((section, index) => index)
    );

    const _renderHeader = (section) => {
        return (
            <HStack
                style={{
                    padding: 20,
                    backgroundColor: theme.colors.info[300],
                }}
            >
                {section.icon ? section.icon : <></>}
                <Text
                    fontFamily={fonts.mono}
                    fontSize={fontSizes['dm-h2']}
                    color={theme.colors.info[50]}
                    hPadding={10}
                    width={'85%'}
                >
                    {section.title}
                </Text>
                <View
                    style={{
                        marginLeft: 'auto',
                    }}
                >
                    <ChevronPlein fill={theme.colors.info[50]} />
                </View>
            </HStack>
        );
    };

    const _renderContent = (section) => {
        return (
            <View
                style={{
                    backgroundColor: theme.colors.info[300],
                    paddingHorizontal: '5%',
                    marginBottom: 5,
                }}
            >
                {section.childComponent}
            </View>
        );
    };

    const _updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <Accordion
            activeSections={activeSections}
            sections={sections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
            expandMultiple={true}
            touchableComponent={TouchableOpacity}
        />
    );
}

export default AccordionComponent;
