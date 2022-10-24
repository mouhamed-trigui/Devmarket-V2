import { Box, Stack } from '@mui/material';
import React from 'react';

const Container: React.FC = ({ children }) => {
    return (
        <Stack
            direction="row"
            gap={5}
            padding={3}
            style={{
                backgroundColor: '#F6F6F6',
                borderRadius: 20,
            }}
            position="relative"
        >
            <Box
                width={20}
                height={20}
                position="absolute"
                top={-10}
                style={{
                    backgroundColor: '#F6F6F6',
                    transform: 'rotate(45deg)',
                }}
            />
            {children}
        </Stack>
    );
};

export default Container;
