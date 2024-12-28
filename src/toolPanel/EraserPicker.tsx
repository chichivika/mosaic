import React, { MouseEvent } from 'react';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { initDraggedObject } from '../redux/dnd/dndSlice';
import Eraser from '../common/Eraser';

export const StyledEraserPicker = styled.div`
    display: flex;
    align-items: center;
`;
export default function EraserPicker() {
    const dispatch: Dispatch = useDispatch();
    return (
        <Tooltip title='Eraser'>
            <StyledEraserPicker
                onClick={(event: MouseEvent) => {
                    dispatch(
                        initDraggedObject({
                            draggedType: 'eraser',
                            draggedColor: null,
                            dragStartMouseX: event.clientX,
                            dragStartMouseY: event.clientY,
                        }),
                    );
                }}
            >
                <Eraser useHoverStyle />
            </StyledEraserPicker>
        </Tooltip>
    );
}
