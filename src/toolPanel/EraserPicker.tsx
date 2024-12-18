import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setDragObject } from '../redux/dndSlice';
import Eraser from '../common/Eraser';

export const StyledEraserPicker = styled.div`
    display: flex;
    align-items: center;
`;
export default function EraserPicker() {
    const dispatch: Dispatch = useDispatch();
    return (
        <StyledEraserPicker
            onClick={(event: MouseEvent) => {
                dispatch(
                    setDragObject({
                        draggedType: 'eraser',
                        draggedColor: null,
                        dragStartMouseX: event.clientX,
                        dragStartMouseY: event.clientY,
                        mouseX: event.clientX,
                        mouseY: event.clientY,
                    }),
                );
            }}
        >
            <Eraser useHoverStyle />
        </StyledEraserPicker>
    );
}
