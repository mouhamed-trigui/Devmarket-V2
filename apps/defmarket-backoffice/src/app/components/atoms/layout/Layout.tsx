import { Box } from '@mui/material';
import React from 'react';

export interface ILayoutProps {
    children: any;
    padding?: number;
    width?: string;
}
const Layout = (props: ILayoutProps) => {
    return (
        <Box
            width={props.width ?? '100%'}
            padding={props.padding}
            style={{
                backgroundColor: '#F6F6F6',
                borderRadius: 20,
            }}
        >
            {props.children}
        </Box>
    );
};

export default Layout;
