import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { List, Box, CircleIcon, HStack } from 'native-base';
import { FormattedMessage } from 'react-intl';
// Components
import { FormControl } from '../../molecules';
import { Text } from '../../atomes';
import { getStatusColor } from '../../../utils/validator';
/* eslint-disable-next-line */
export interface FormRegistrationProps {
    button?: string;
    FormControl1: any;
    FormControl2: any;
    acceptTC?: boolean;
    setAcceptTC?: any;
    navigation?: any;
}

const StyledFormRegistration = styled.View`
    width: 100%;
    margin-top: 10px;
`;

/* const StyledCheckbox = styled.View`
    align-self: center;
    display: flex;
    padding-bottom: 30px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`; */

const StyledViewExigences = styled.View`
    margin-top: 15px;
    align-items: center;
`;

export function FormRegistration(props: FormRegistrationProps) {
    return (
        <StyledFormRegistration>
            {props?.FormControl1 && (
                <FormControl
                    label={props.FormControl1.label}
                    placeholder={props.FormControl1.placeholder}
                    value={props.FormControl1.value}
                    type={props.FormControl1.type}
                    error={props.FormControl1.error}
                    errorMessage={props.FormControl1.errorMessage}
                    helperText={props.FormControl1.helperText}
                    onChange={props?.FormControl1?.onChange}
                />
            )}

            {props?.FormControl2 && (
                <FormControl
                    label={props.FormControl2.label}
                    placeholder={props.FormControl2.placeholder}
                    value={props.FormControl2.value}
                    type={props.FormControl2.type}
                    error={props.FormControl2.error}
                    errorMessage={props.FormControl2.errorMessage}
                    helperText={props.FormControl2.helperText}
                    onChange={props.FormControl2.onChange}
                />
            )}
            {/** TODO : GET STATUS RESPONSE CODE FROM THE BACKEND   */}
            {props?.FormControl1?.type === 'password' && (
                <StyledViewExigences>
                    <Text
                        fontFamily="bold"
                        fontSize="dm-3p"
                        color={'system.200'}
                        textAlign="center"
                        moreParams={{ fontWeight: 800 }}
                    >
                        <FormattedMessage
                            id="vDvX6s"
                            defaultMessage="Exigences minimales"
                        />
                    </Text>
                    <Box w="70%" alignItems="center">
                        <List
                            width="70%"
                            space={1}
                            my={1}
                            borderWidth={0}
                            ml={10}
                        >
                            <List.Item p={0}>
                                <HStack space={1}>
                                    <CircleIcon
                                        size="5"
                                        color={getStatusColor(
                                            props?.FormControl1?.value,
                                            '8 characters'
                                        )}
                                    />
                                    <Text
                                        fontFamily="body"
                                        fontSize="dm-2p"
                                        color={'system.200'}
                                    >
                                        <FormattedMessage
                                            id="cW76+7"
                                            defaultMessage="8 caractères"
                                        />
                                    </Text>
                                </HStack>
                            </List.Item>
                            <List.Item p={0}>
                                <HStack space={1} alignItems="center">
                                    <CircleIcon
                                        size="5"
                                        color={getStatusColor(
                                            props?.FormControl1?.value,
                                            'one digit'
                                        )}
                                    />
                                    <Text
                                        fontFamily="body"
                                        fontSize="dm-2p"
                                        color={'system.200'}
                                    >
                                        <FormattedMessage
                                            id="lgok95"
                                            defaultMessage="1 chiffre"
                                        />
                                    </Text>
                                </HStack>
                            </List.Item>
                            <List.Item p={0}>
                                <HStack space={1} alignItems="center">
                                    <CircleIcon
                                        size="5"
                                        color={getStatusColor(
                                            props?.FormControl1?.value,
                                            'one upper case'
                                        )}
                                    />
                                    <Text
                                        fontFamily="body"
                                        fontSize="dm-2p"
                                        color={'system.200'}
                                    >
                                        <FormattedMessage
                                            id="E/8TNP"
                                            defaultMessage="1 majuscule"
                                        />
                                    </Text>
                                </HStack>
                            </List.Item>
                            <List.Item p={0}>
                                <HStack space={1} alignItems="center">
                                    <CircleIcon
                                        size="5"
                                        color={getStatusColor(
                                            props?.FormControl1?.value,
                                            'one lower case'
                                        )}
                                    />
                                    <Text
                                        fontFamily="body"
                                        fontSize="dm-2p"
                                        color={'system.200'}
                                    >
                                        <FormattedMessage
                                            id="t7wYGM"
                                            defaultMessage="1 minuscule"
                                        />
                                    </Text>
                                </HStack>
                            </List.Item>
                            <List.Item p={0}>
                                <HStack space={1} alignItems="center">
                                    <CircleIcon
                                        size="5"
                                        color={getStatusColor(
                                            props?.FormControl1?.value,
                                            'special characters'
                                        )}
                                    />
                                    <Text
                                        fontFamily="body"
                                        fontSize="dm-2p"
                                        color={'system.200'}
                                    >
                                        <FormattedMessage
                                            id="ONy84v"
                                            defaultMessage="1 caractère spécial"
                                        />
                                    </Text>
                                </HStack>
                            </List.Item>
                        </List>
                    </Box>
                </StyledViewExigences>
            )}
        </StyledFormRegistration>
    );
}

export default FormRegistration;
