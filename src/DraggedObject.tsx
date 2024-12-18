import React, { useEffect, useRef, RefObject } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectPinShape, selectPinSize, setPinColor } from './redux/boardSlice';
import {
    selectDraggedColor,
    selectDraggedType,
    selectDragStartMouseX,
    selectDragStartMouseY,
    setMousePosition,
    clearDragObject,
} from './redux/dndSlice';
import Pin from './common/Pin';
import Eraser from './common/Eraser';

const StyledDraggedCnt = styled.div<{ $initialLeft: number; $initialTop: number }>`
    position: absolute;
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

    const clearDraggedObject = () => {
        dispatch(clearDragObject());
    };
    const updateDraggedCoordinates = (event: MouseEventInit) => {
        const pinCnt = pinCntRef.current;
        if (pinCnt === null) {
            return;
        }
        if (event.clientX === undefined || event.clientY === undefined) {
            return;
        }
        const positionLeft = Math.min(
            event.clientX - pinSize / 2,
            document.body.clientWidth - pinSize - 5,
        );
        const positionTop = Math.min(
            event.clientY - pinSize / 2,
            document.body.clientHeight - pinSize - 5,
        );
        pinCnt.style.left = `${positionLeft}px`;
        pinCnt.style.top = `${positionTop}px`;

        dispatch(
            setMousePosition({
                mouseX: event.clientX,
                mouseY: event.clientY,
            }),
        );
    };

    useEffect(() => {
        if (draggedType === null) {
            return;
        }
        document.onmousemove = updateDraggedCoordinates;
        document.onmouseleave = clearDraggedObject;

        return () => {
            document.removeEventListener('onmousemove', updateDraggedCoordinates);
            document.removeEventListener('onmouseleave', clearDraggedObject);
        };
    }, [draggedType]);

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
            onContextMenu={(event) => {
                event.preventDefault();
                clearDraggedObject();
            }}
            onClick={() => {
                dispatch(
                    setPinColor({
                        color: pinColor,
                    }),
                );
            }}
        >
            {objectToDrag}
        </StyledDraggedCnt>
    );
}

function _getPositionByCursor(mouseX: number, mouseY: number, pinSize: number) {
    return {
        left: mouseX - pinSize / 2,
        top: mouseY - pinSize / 2,
    };
}
