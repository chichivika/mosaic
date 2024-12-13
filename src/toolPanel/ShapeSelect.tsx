import React from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '../common/MenuItem';
import Select from '../common/Select';
import Pin from '../common/Pin';
import { setPinShape, selectPinShape } from '../redux/boardSlice';
import { PinShape } from '../utils/mosaicTypes';

function ShapeSelect() {
    const dispatch: Dispatch = useDispatch();
    const shapeValue = useSelector(selectPinShape);
    return (
        <Select
            value={shapeValue}
            onChange={(event) => dispatch(setPinShape(event.target.value as PinShape))}
        >
            <MenuItem value='round'>
                <Pin shape='round' />
            </MenuItem>
            <MenuItem value='square'>
                <Pin shape='square' />
            </MenuItem>
        </Select>
    );
}

export default ShapeSelect;
