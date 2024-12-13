import React from 'react';
import styled from 'styled-components';
import { Select as UiSelect, SelectProps } from '@mui/material';

const StyledUiSelect = styled(UiSelect)`
    fieldset {
        border: 0px;
    }
` as typeof UiSelect;
function Select(props: SelectProps) {
    return <StyledUiSelect size='small' {...props} />;
}

export default Select;
