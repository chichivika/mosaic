import React, { useEffect } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectPinShape,
    selectPinSize,
    setSelectedCell,
    selectPinsCountW,
    selectPinsCountH,
    selectPinsColors,
    boardPadding,
    initPinsColors,
} from '../redux/boardSlice';
import HoverBoard from '../HoverBoard';

export default function AppBoard() {
    const dispatch: Dispatch = useDispatch();
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);
    const pinsCountW = useSelector(selectPinsCountW);
    const pinsCountH = useSelector(selectPinsCountH);

    useEffect(() => {
        dispatch(initPinsColors({ pinsCountW, pinsCountH }));
    }, [pinsCountW, pinsCountH]);

    return (
        <HoverBoard
            concernsForDND
            pinShape={pinShape}
            pinSize={pinSize}
            boardPadding={boardPadding}
            pinsCountW={pinsCountW}
            pinsCountH={pinsCountH}
            pinsColors={useSelector(selectPinsColors)}
            onSelectedCellChange={(cellInds) => {
                dispatch(setSelectedCell(cellInds));
            }}
        />
    );
}
