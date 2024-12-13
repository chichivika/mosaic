import React from 'react';
import styled from 'styled-components';
import { MenuItem as UiMenuItem, MenuItemProps } from '@mui/material';
import colors from '../styles/colors';

const StyledMenuItem = styled(UiMenuItem)`
    &.MuiButtonBase-root {
        color: ${colors.fontColor};
        font-weight: 600;
    }
    &.MuiButtonBase-root.Mui-selected {
        background-color: ${colors.selectedItemBgColor};
        &:is(.Mui-focusVisible, :hover) {
            background-color: ${colors.selectedItemHoverBgColor};
        }
    }
` as typeof UiMenuItem;
function MenuItem(props: MenuItemProps) {
    return <StyledMenuItem {...props} />;
}

export default MenuItem;
