import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'native-base';
import loaderImage from '../../../../assets/images/png/loader.png';
/* eslint-disable-next-line */
export interface ProgressBarProps {
    bgcolor: string;
    progress: number;
    height: number;
}

export function ProgressBar(props: ProgressBarProps) {
    const StyledProgressBar = styled.View``;

    const StyledProgressBarChild = styled.Image``;

    const StyledProgressBarprogresstext = styled.Text``;

    return (
        <StyledProgressBar
            height={props?.height}
            width="100%"
            backgroundColor={'whitesmoke'}
            borderRadius={40}
            margin={50}
        >
            <StyledProgressBarChild
                style={{ height: '100%', width: `${props?.progress}%` }}
                backgroundColor={props?.bgcolor}
                borderRadius={40}
                textAlign={'right'}
                source={loaderImage}
            >
                {/* <StyledProgressBarprogresstext
                    padding={10}
                    color={'black'}
                    fontWeight={900}
                >
                    {`${props?.progress}%`}
                </StyledProgressBarprogresstext> */}
            </StyledProgressBarChild>
        </StyledProgressBar>
    );
}

export default ProgressBar;
