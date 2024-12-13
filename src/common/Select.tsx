import React from 'react';
import styled from 'styled-components';
import { Select as UiSelect, SelectProps } from '@mui/material';
import colors from '../styles/colors';

type Props = SelectProps & {
    width?: string;
};

const StyledUiSelect = styled(UiSelect)<{ $width?: string }>`
    width: ${(props) => props.$width ?? 'auto'};
    &.MuiInputBase-root {
        color: ${colors.fontColor};
        font-weight: 600;
    }
    fieldset {
        border: 0px;
    }
`;
function Select(props: Props) {
    const { width, ...uiProps } = props;
    return <StyledUiSelect size='small' {...uiProps} $width={width} />;
}

export default Select;
