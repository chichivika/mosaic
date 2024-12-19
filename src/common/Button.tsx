import React from 'react';
import styled from 'styled-components';
import { ButtonProps, Button as UiButton } from '@mui/material';

const StyledButton = styled(UiButton)`
    &.MuiButtonBase-root.MuiButton-root {
        color: ${(props) => props.theme.fontColor};
    }
`;
export default function Button(props: ButtonProps) {
    return <StyledButton size='small' {...props} />;
}
