import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { clearDraggedObject } from '../redux/dnd/dndSlice';
import Bin from '../common/Bin';
import { selectIsDNDMode, selectDraggedColor } from '../redux/dnd/dndSelectors';
import { getCurrentState } from '../redux/store';

export const StyledBinCnt = styled.div<{ $padding: string }>`
    display: flex;
    align-items: center;
    padding: ${(props) => props.$padding};
`;
export default function ColorBin() {
    const dispatch: Dispatch = useDispatch();
    const isDNDMode = useSelector(selectIsDNDMode);
    const [throwedColor, setThrowedColor] = useState<string | null>(null);

    const disabled = !isDNDMode;
    return (
        <Tooltip title={isDNDMode ? 'Throw out' : ''}>
            <StyledBinCnt
                $padding={isDNDMode ? '0px' : '0px 5px'}
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
                    useHoverStyle
                    disabled={disabled}
                    width={isDNDMode ? 30 : 20}
                    throwedColor={throwedColor}
                />
            </StyledBinCnt>
        </Tooltip>
    );
}
