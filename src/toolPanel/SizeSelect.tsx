import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';
import { PinSize } from '../utils/mosaicTypes';
import MenuItem from '../common/MenuItem';
import { setPinSize, selectPinSize } from '../redux/boardSlice';
import Select from '../common/Select';

const StyledSizeCnt = styled(Select)`
    width: 65px;
    &.MuiInputBase-root {
        font-size: 1.3rem;
    }
`;
function SizeSelect() {
    const dispatch: Dispatch = useDispatch();
    const sizeValue = useSelector(selectPinSize);
    return (
        <StyledSizeCnt
            size='small'
            value={sizeValue}
            onChange={(event) => dispatch(setPinSize(event.target.value as PinSize))}
        >
            <MenuItem value='s'>S</MenuItem>
            <MenuItem value='m'>M</MenuItem>
            <MenuItem value='l'>L</MenuItem>
        </StyledSizeCnt>
    );
}

export default SizeSelect;
