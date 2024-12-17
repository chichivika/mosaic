import React from 'react';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '../common/MenuItem';
import Select from '../common/Select';
import Pin from '../common/Pin';
import { setPinShape, selectPinShape } from '../redux/boardSlice';
import { PinShape } from '../utils/mosaicTypes';

const StyledMenuItem = styled(MenuItem)`
    &.MuiMenuItem-root {
        canvas {
            width: 27px;
            height: 27px;
        }
    }
`;
function ShapeSelect() {
    const dispatch: Dispatch = useDispatch();
    const shapeValue = useSelector(selectPinShape);
    return (
        <Select
            value={shapeValue}
            onChange={(event) => dispatch(setPinShape(event.target.value as PinShape))}
        >
            <StyledMenuItem value='round'>
                <Pin pinShape='round' />
            </StyledMenuItem>
            <StyledMenuItem value='square'>
                <Pin pinShape='square' />
            </StyledMenuItem>
        </Select>
    );
}

export default ShapeSelect;
