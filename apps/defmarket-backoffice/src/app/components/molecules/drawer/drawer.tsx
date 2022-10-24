import { useState } from 'react';
import styled from '@emotion/styled';
import { Drawer as MuiDrawer } from '@mui/material';

/* eslint-disable-next-line */
export interface DrawerProps {
    anchor: 'left' | 'right' | 'top' | 'bottom';
    open: boolean,
    onClose:any,
    children: any,
}

const StyledDrawer = styled.div`
    color: pink;
`;

export function Drawer(props: DrawerProps) {

    return (
        <StyledDrawer>
            <MuiDrawer
                anchor={props?.anchor}
                open={props?.open}
                onClose={props?.onClose}
            >
                {props?.children}
            </MuiDrawer>
        </StyledDrawer>
    );
}

export default Drawer;
