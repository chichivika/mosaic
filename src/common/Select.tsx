import React from 'react';
import styled from 'styled-components';
import { Select as UiSelect, SelectProps } from '@mui/material';

type Props = SelectProps & {
    width?: string;
};

export const StyledUiSelect = styled(UiSelect)<{ $width?: string }>`
    width: ${(props) => props.$width ?? 'auto'};
    &.MuiInputBase-root {
        color: ${(props) => props.theme.fontColor};
        font-weight: 600;

        :is(.MuiSelect-select, .MuiSvgIcon-root) {
            transition: color 0.5s;
        }
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
