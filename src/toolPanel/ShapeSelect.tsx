import React from 'react';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '../common/MenuItem';
import Select from '../common/Select';
import Pin from '../common/Pin';
import { setPinShape, selectPinShape } from '../redux/boardSlice';
import { PinShape } from '../utils/mosaicTypes';
import colors from '../styles/colors';

const StyledMenuItem = styled(MenuItem)`
    &.MuiMenuItem-root {
    }
`;
function ShapeSelect() {
    const dispatch: Dispatch = useDispatch();
    const shapeValue = useSelector(selectPinShape);
    const pinColor = colors.selectPinShapeColor;

    return (
        <Select
            value={shapeValue}
            onChange={(event) => dispatch(setPinShape(event.target.value as PinShape))}
        >
            <StyledMenuItem value='round'>
                <Pin pinShape='round' pinColor={pinColor} />
            </StyledMenuItem>
            <StyledMenuItem value='square'>
                <Pin pinShape='square' pinColor={pinColor} />
            </StyledMenuItem>
            <StyledMenuItem value='roundGem'>
                <Pin pinShape='roundGem' pinColor={pinColor} />
            </StyledMenuItem>
            <StyledMenuItem value='squareGem'>
                <Pin pinShape='squareGem' pinColor={pinColor} />
            </StyledMenuItem>
        </Select>
    );
}

export default ShapeSelect;
