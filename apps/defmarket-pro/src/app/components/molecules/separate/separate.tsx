import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { Text } from '../../atomes';

// Redux
import { useDispatch } from 'react-redux';

/* eslint-disable-next-line */
export interface SeparateProps {
    navigation: any | undefined;
    index: number;
    setIndex: any;
}

const StyledSeparate = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    position: absolute;
    bottom: 0;
`;

export function Separate(props: SeparateProps) {
    // Redux
    const dispatch = useDispatch();

    const skipAll = () => {
        //dispatch(userActions.setIsVisited(true));
        props.navigation.navigate('Registration');
    };
    return (
        <StyledSeparate>
            <Button
                _pressed={{ style: { opacity: 0.2 } }}
                variant="unstyled"
                onPress={() => skipAll()}
            >
                <Text
                    fontFamily="workSans"
                    fontSize="dm-p"
                    textAlign="center"
                    color="system.50"
                >
                    <FormattedMessage id="CH0dmQ" defaultMessage="PASSER" />
                </Text>
            </Button>

            <Button
                _pressed={{ style: { opacity: 0.2 } }}
                variant="unstyled"
                onPress={() =>
                    props.index < 3
                        ? props.setIndex(props.index + 1)
                        : props.navigation.navigate('Registration', {
                              redirection: 'Registration',
                          })
                }
            >
                <Text
                    fontFamily="workSans"
                    fontSize="dm-p"
                    textAlign="center"
                    color="system.50"
                >
                    {props.index < 3 ? (
                        <FormattedMessage
                            id="UCypUU"
                            defaultMessage="SUIVANT"
                        />
                    ) : (
                        <FormattedMessage
                            id="Z7G6oI"
                            defaultMessage="COMMENCER"
                        />
                    )}
                </Text>
            </Button>
        </StyledSeparate>
    );
}

export default Separate;
