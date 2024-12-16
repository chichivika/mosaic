import React from 'react';
import styled from 'styled-components';
import { MenuItem as UiMenuItem, MenuItemProps } from '@mui/material';

const StyledMenuItem = styled(UiMenuItem)`
    &.MuiButtonBase-root {
        color: ${(props) => props.theme.fontColor};
        font-weight: 600;
    }
    &.MuiButtonBase-root.Mui-selected {
        background-color: ${(props) => props.theme.selectedItemBgColor};
        &:is(.Mui-focusVisible, :hover) {
            background-color: ${(props) => props.theme.selectedItemHoverBgColor};
        }
    }
` as typeof UiMenuItem;
function MenuItem(props: MenuItemProps) {
    return <StyledMenuItem {...props} />;
}

export default MenuItem;
