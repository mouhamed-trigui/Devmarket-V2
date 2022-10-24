import { Conciergerie, ItineraireBlanc } from '../../../../theme/svgs';
import { IconButton } from '../../icon-button/IconButton';
import { View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import HStack from '../../stack/HStack';

export interface ActionButtonProps {
    conciergerie: Boolean;
    itineraire?: Boolean;
    pressItineraire?: (index: number) => void;
}
function ActionButtons(props: ActionButtonProps) {
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
            <HStack>
                {props?.conciergerie && (
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
                )}
                {props?.itineraire && (
                    <IconButton
                        icon={
                            <ItineraireBlanc
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
                        bgColor={theme.colors.primary[50]}
                        shadow={true}
                        style={{
                            marginLeft: 15,
                        }}
                        onPress={(index) => {
                            if (props.pressItineraire)
                                props.pressItineraire(index);
                        }}
                    />
                )}
            </HStack>
        </View>
    );
}

export default ActionButtons;
