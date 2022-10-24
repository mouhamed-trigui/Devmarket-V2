import React from 'react';
import { Box, Divider, Flex, VStack } from 'native-base';
import IconButton from '../../atomes/icon-button/icon-button';
import TracePNG from '../../../../assets/images/png/Trace.png';
import TraceSVG from '../../../../assets/images/svg/checked.svg';
import { Platform, Image } from 'react-native';

/* eslint-disable-next-line */
export interface StepperProps {
    activeIndex: number;
    divider: boolean;
    items: {
        active: any;
        inactive: any;
        completed?: boolean;
    }[];
    onlyIcon: boolean;
    setActiveIndex: (index: number) => void;
}

export function Stepper(props: StepperProps) {
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            width="90%"
            position="relative"
        >
            {props?.divider && (
                <Divider
                    key="stepper"
                    marginTop={Platform.OS === 'android' ? 2 : 0}
                    width="100%"
                    position="absolute"
                    top="50%"
                />
            )}
            {props.items.map((item, index) => (
                <Box key={index} alignItems="center">
                    <VStack
                        key={'Vstack-' + index}
                        marginTop={Platform.OS === 'android' ? 5 : 0}
                    >
                        {item.completed && (
                            <Box
                                key={'box-' + index}
                                style={{ width: 50, position: 'absolute' }}
                                mb={-4}
                                mr={-1}
                                zIndex={1}
                                p={0}
                                alignSelf="flex-end"
                            >
                                {Platform.OS === 'web' ? (
                                    <Image
                                        accessibilityLabel="traceImage"
                                        source={TracePNG}
                                        style={{
                                            resizeMode: 'contain',
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                ) : (
                                    <TraceSVG
                                        style={{
                                            marginLeft: 33,
                                            width: 33,
                                            height: 25,
                                        }}
                                    />
                                )}
                            </Box>
                        )}

                        <IconButton
                            completed={item.completed ?? false}
                            key={index}
                            icon={item}
                            active={index === props.activeIndex}
                            index={index}
                            onPress={
                                item.completed
                                    ? undefined
                                    : props.setActiveIndex
                            }
                            onlyIcon={props?.onlyIcon}
                        />
                    </VStack>
                </Box>
            ))}
        </Flex>
    );
}

export default Stepper;
