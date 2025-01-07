import React, { useEffect, useRef, RefObject, useCallback } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { selectPinShape, selectPinSize } from './redux/board/boardSelectors';
import { clearDraggedObject } from './redux/dnd/dndSlice';
import {
    selectDraggedColor,
    selectDraggedType,
    selectDragStartMouseX,
    selectDragStartMouseY,
} from './redux/dnd/dndSelectors';
import Pin from './common/Pin';
import Eraser from './common/Eraser';

const StyledDraggedCnt = styled.div<{ $initialLeft: number; $initialTop: number }>`
    position: fixed;
    pointer-events: none;
    left: ${(props) => props.$initialLeft}px;
    top: ${(props) => props.$initialTop}px;
`;

export default function DraggedObject() {
    const dispatch: Dispatch = useDispatch();
    const pinColor = useSelector(selectDraggedColor);
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);
    const draggedType = useSelector(selectDraggedType);
    const dragStartMouseX = useSelector(selectDragStartMouseX);
    const dragStartMouseY = useSelector(selectDragStartMouseY);

    const pinCntRef = useRef(null) as RefObject<HTMLDivElement>;

    const clearDND = useCallback(() => {
        dispatch(clearDraggedObject());
        return false;
    }, [dispatch]);

    const updateDraggedCoordinates = useCallback(
        (event: MouseEventInit) => {
            const pinCnt = pinCntRef.current;
            if (pinCnt === null) {
                return;
            }
            if (event.clientX === undefined || event.clientY === undefined) {
                return;
            }
            const newPosition = _getPositionByCursor(event.clientX, event.clientY, pinSize);
            pinCnt.style.left = `${newPosition.left}px`;
            pinCnt.style.top = `${newPosition.top}px`;
        },
        [pinSize],
    );

    useEffect(() => {
        if (draggedType === null) {
            return;
        }
        const throttledUpdateCallback = throttle(updateDraggedCoordinates, 20);
        document.onmousemove = throttledUpdateCallback;
        document.onmouseleave = clearDND;
        document.oncontextmenu = clearDND;

        return () => {
            document.removeEventListener('onmousemove', throttledUpdateCallback);
            document.removeEventListener('onmouseleave', clearDND);
            document.removeEventListener('oncontextmenu', clearDND);
        };
    }, [draggedType, clearDND, updateDraggedCoordinates]);

    const initialPosition = _getPositionByCursor(dragStartMouseX, dragStartMouseY, pinSize);

    if (draggedType === null) {
        return null;
    }

    const objectToDrag =
        draggedType === 'eraser' ? (
            <Eraser width={pinSize} />
        ) : (
            <Pin pinShape={pinShape} pinSize={pinSize} pinColor={pinColor} />
        );

    return (
        <StyledDraggedCnt
            ref={pinCntRef}
            $initialLeft={initialPosition.left}
            $initialTop={initialPosition.top}
        >
            {objectToDrag}
        </StyledDraggedCnt>
    );
}

function _getPositionByCursor(mouseX: number, mouseY: number, pinSize: number) {
    return {
        left: Math.min(mouseX - pinSize / 2, document.body.clientWidth - pinSize),
        top: Math.min(mouseY - pinSize / 2, document.body.clientHeight - pinSize),
    };
}
