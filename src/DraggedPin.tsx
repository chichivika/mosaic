import React, { useEffect, useRef, RefObject } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectDraggedColor,
    selectPinShape,
    selectPinSize,
    setDraggedColor,
} from './redux/boardSlice';
import Pin from './common/Pin';

const StyledDraggedPinCnt = styled.div`
    position: absolute;
`;

export default function DraggedPin() {
    const dispatch: Dispatch = useDispatch();
    const pinColor = useSelector(selectDraggedColor);
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);
    const pinCntRef = useRef(null) as RefObject<HTMLDivElement>;

    const updateDraggedCoordinates = (event: MouseEventInit) => {
        const pinCnt = pinCntRef.current;
        if (pinCnt === null) {
            return;
        }
        if (event.clientX === undefined || event.clientY === undefined) {
            return;
        }
        pinCnt.style.left = `${event.clientX - pinSize / 2}px`;
        pinCnt.style.top = `${event.clientY - pinSize / 2}px`;
    };

    const clearDraggedColor = () => {
        dispatch(setDraggedColor(null));
    };

    useEffect(() => {
        if (pinColor === null) {
            return;
        }
        document.onmousemove = updateDraggedCoordinates;
        document.onmouseleave = clearDraggedColor;

        return () => {
            document.removeEventListener('onmousemove', updateDraggedCoordinates);
            document.removeEventListener('onmouseleave', clearDraggedColor);
        };
    }, [pinColor]);

    if (pinColor === null) {
        return null;
    }

    return (
        <StyledDraggedPinCnt ref={pinCntRef}>
            <Pin pinShape={pinShape} pinSize={pinSize} pinColor={pinColor} />
        </StyledDraggedPinCnt>
    );
}
