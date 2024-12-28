import React from 'react';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { clearDraggedObject } from '../redux/dnd/dndSlice';
import Bin from '../common/Bin';
import { selectIsDNDMode } from '../redux/dnd/dndSelectors';

export const StyledBinCnt = styled.div<{ $padding: string }>`
    display: flex;
    align-items: center;
    padding: ${(props) => props.$padding};
`;
export default function ColorBin() {
    const dispatch: Dispatch = useDispatch();
    const isDNDMode = useSelector(selectIsDNDMode);

    return (
        <Tooltip title={isDNDMode ? 'Throw out' : ''}>
            <StyledBinCnt
                $padding={isDNDMode ? '0px' : '0px 5px'}
                onClick={() => {
                    dispatch(clearDraggedObject());
                }}
            >
                <Bin useHoverStyle disabled={!isDNDMode} width={isDNDMode ? 30 : 20} />
            </StyledBinCnt>
        </Tooltip>
    );
}
