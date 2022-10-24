import React from 'react';
import styled from 'styled-components/native';
import { Text, VStack } from 'native-base';

/* eslint-disable-next-line */
export interface LogoDefmarketProps {
    title?: string | null;
    fontSize?: string | undefined | null;
    fontFamily?: 'body' | 'heading' | 'mono' | 'workSans';
    fontWeight?: number;
    bold?: boolean | undefined;
}
const StyledContainer = styled.View`
    padding: 10px;
`;
const StyledBadge = styled.Text`
    color: white;
    font-size: 14px;
    background-color: #eaae00;
    border-radius: 20px;
    display: flex;
    padding: 1px 8px 1px 8px;
    justify-content: center;
    margin-top: -10px;
    margin-right: 10px;
`;

const StyledBadgeContainer = styled.View`
    align-self: flex-end;
`;
export function LogoDefmarket(props: LogoDefmarketProps) {
    return props?.title ? (
        <StyledContainer>
            <Text
                fontFamily={props.fontFamily ?? 'heading'}
                fontWeight={props?.fontWeight ?? 100}
                fontSize={props?.fontSize ?? 'dm-h1'}
                color="white"
                textAlign="center"
                bold={props.bold}
            >
                {props?.title}
            </Text>
        </StyledContainer>
    ) : (
        <VStack alignSelf="center">
            <Text
                fontFamily="heading"
                fontWeight={600}
                fontSize={props?.fontSize ?? '5xl'}
                color="white"
                textAlign="center"
            >
                DEFMARKET
            </Text>
            <StyledBadgeContainer>
                <StyledBadge fontFamily="mono">PRO</StyledBadge>
            </StyledBadgeContainer>
        </VStack>
    );
}
export default LogoDefmarket;
