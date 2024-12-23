import React, { useEffect } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectPinShape,
    selectPinSize,
    setSelectedCell,
    selectPinsColors,
    setPinColor,
    selectPinsCount,
    boardPadding,
    pinPadding,
    resizeBoard,
} from '../redux/boardSlice';
import { initDragObject } from '../redux/dndSlice';
import HoverBoard from '../HoverBoard';
import { BoardClickEventObject } from '../Board';

export default function AppBoard() {
    const dispatch: Dispatch = useDispatch();
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);
    const [pinsCountW, pinsCountH] = useSelector(selectPinsCount);

    useEffect(() => {
        dispatch(resizeBoard([pinsCountW, pinsCountH]));
    }, [pinsCountW, pinsCountH, dispatch]);

    return (
        <HoverBoard
            concernsForDND
            pinShape={pinShape}
            pinSize={pinSize}
            boardPadding={boardPadding}
            pinsCountW={pinsCountW}
            pinsCountH={pinsCountH}
            pinPadding={pinPadding}
            pinsColors={useSelector(selectPinsColors)}
            onSelectedCellChange={(cellInds) => {
                dispatch(setSelectedCell(cellInds));
            }}
            onClick={(event: BoardClickEventObject) => {
                if (event.color === null) {
                    return;
                }
                dispatch(setPinColor({ color: null }));
                dispatch(
                    initDragObject({
                        draggedType: 'singlePin',
                        draggedColor: event.color,
                        dragStartMouseX: event.mouseX,
                        dragStartMouseY: event.mouseY,
                    }),
                );
            }}
        />
    );
}
