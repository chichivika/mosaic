import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';
import { PinSize } from '../utils/mosaicTypes';
import MenuItem from '../common/MenuItem';
import Select from '../common/Select';
import { setPinSize, selectPinSize } from '../redux/boardSlice';

function SizeSelect() {
    const dispatch: Dispatch = useDispatch();
    const sizeValue = useSelector(selectPinSize);
    return (
        <Select
            width='70px'
            value={sizeValue}
            onChange={(event) => dispatch(setPinSize(event.target.value as PinSize))}
        >
            <MenuItem value='s'>S</MenuItem>
            <MenuItem value='m'>M</MenuItem>
            <MenuItem value='l'>L</MenuItem>
        </Select>
    );
}

export default SizeSelect;
