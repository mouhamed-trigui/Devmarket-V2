import { HStack, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Atomes } from '../../../components';

/* eslint-disable-next-line */
export interface LoaderProps {
    route?: any;
    navigation?: any;
}

const StyledLoader = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px;

    justify-content: center;
`;
const StyledProgressBar = styled.View`
    width: 100%;
    display: flex;
    padding-left: 80px;
    padding-right: 80px;
    align-items: center;
    justify-content: center;
`;
export function Loader(props: LoaderProps) {
    //const { redirection } = props?.route.params;
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [progress, setProgress] = useState(0);

    let count = 0;

    const counter = () => {
        let t2;
        if (count < 100) {
            count += 10;
            t2 = setTimeout(counter, 250);
            setProgress(count);
        } else {
            clearTimeout(t2);
            /* if (redirection) props?.navigation?.navigate(redirection);
            else props?.navigation?.navigate('Login'); */
        }
    };

    useEffect(() => {
        setQuestion('L’appli qui veut du bien aux commerces locaux');
        //setQuestion('Quel est le dessert préféré des pompiers ?');
        //setAnswer('La crème brulée');
        counter();

        return () => {
            setProgress(0);
        };
    }, []);
    return (
        <StyledLoader>
            {/* <Text fontSize="5xl">🧐</Text> */}
            <Text fontSize="5xl">🛍</Text>
            <Atomes.Text
                fontFamily="mono"
                fontSize="3xl"
                color="white"
                textAlign="center"
                moreParams={{
                    marginLeft : 2,
                    marginRight : 2,
                }}
            >
                {question}
            </Atomes.Text>
            <StyledProgressBar>
                <Atomes.ProgressBar
                    bgcolor="orange"
                    progress={progress}
                    height={30}
                ></Atomes.ProgressBar>
            </StyledProgressBar>
            <HStack space={2}>
                <Atomes.Text
                    italic
                    fontFamily="body"
                    fontSize="dm-h1"
                    color="white"
                    textAlign="center"
                >
                    {answer}
                </Atomes.Text>
                {/* <Atomes.Text
                    fontFamily="body"
                    fontSize="dm-h1"
                    color="white"
                    textAlign="center"
                >
                    🍮
                </Atomes.Text> */}
            </HStack>
        </StyledLoader>
    );
}

export default Loader;
