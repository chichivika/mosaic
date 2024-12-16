import React from 'react';
import styled from 'styled-components';
import { IconButtonProps, IconButton as UiIconButton } from '@mui/material';

const StyledIconButton = styled(UiIconButton)`
    &.MuiButtonBase-root.MuiIconButton-root {
        padding: 0px;
        color: ${(props) => props.theme.fontColor};
        &.Mui-disabled {
            color: ${(props) => props.theme.fontDisabledColor};
            &:hover {
                color: ${(props) => props.theme.fontDisabledColor};
            }
        }
        &:hover {
            color: ${(props) => props.theme.fontHoverColor};
        }
        &:active {
            color: ${(props) => props.theme.fontActiveColor};
        }
    }
`;

function IconButton(props: IconButtonProps) {
    const { children, ...buttonProps } = props;
    return (
        <StyledIconButton disableRipple disableFocusRipple {...buttonProps}>
            {children}
        </StyledIconButton>
    );
}

export default IconButton;
