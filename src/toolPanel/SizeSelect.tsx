import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';
import { PinSizeAlias } from '../utils/mosaicTypes';
import MenuItem from '../common/MenuItem';
import { setPinSizeAlias, selectPinSizeAlias } from '../redux/boardSlice';
import Select from '../common/Select';

const StyledSizeCnt = styled(Select)`
    width: 65px;
    &.MuiInputBase-root {
        font-size: 1.3rem;
    }
`;
function SizeSelect() {
    const dispatch: Dispatch = useDispatch();
    const sizeAlias = useSelector(selectPinSizeAlias);
    return (
        <StyledSizeCnt
            size='small'
            value={sizeAlias}
            onChange={(event) => dispatch(setPinSizeAlias(event.target.value as PinSizeAlias))}
        >
            <MenuItem value='s'>S</MenuItem>
            <MenuItem value='m'>M</MenuItem>
            <MenuItem value='l'>L</MenuItem>
        </StyledSizeCnt>
    );
}

export default SizeSelect;
