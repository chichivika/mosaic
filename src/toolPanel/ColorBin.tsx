import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { clearDraggedObject } from '../redux/dnd/dndSlice';
import Bin from '../common/Bin';
import { selectIsDNDMode, selectDraggedColor } from '../redux/dnd/dndSelectors';
import { getCurrentState } from '../redux/store';

export const StyledBinCnt = styled.div`
    display: flex;
    align-items: center;
`;
export default function ColorBin() {
    const dispatch: Dispatch = useDispatch();
    const isDNDMode = useSelector(selectIsDNDMode);
    const [throwedColor, setThrowedColor] = useState<string | null>(null);

    const disabled = !isDNDMode;
    return (
        <Tooltip title={disabled ? '' : 'Throw out'}>
            <StyledBinCnt
                onClick={() => {
                    if (disabled) {
                        return;
                    }
                    const draggedColor = selectDraggedColor(getCurrentState());
                    setThrowedColor(draggedColor);
                    dispatch(clearDraggedObject());
                }}
            >
                <Bin
                    useWidthAnimation
                    disabled={disabled}
                    defaultWidth={19}
                    hoverWidth={27}
                    throwedColor={throwedColor}
                />
            </StyledBinCnt>
        </Tooltip>
    );
}
