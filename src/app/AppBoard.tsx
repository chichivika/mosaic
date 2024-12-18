import React, { useEffect } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectPinShape,
    selectPinSize,
    setSelectedCell,
    selectPinsColors,
    initPinsColors,
} from '../redux/boardSlice';
import HoverBoard from '../HoverBoard';
import Mosaic from '../utils/mosaicClass';

const availableWidth = 1000;
const availableHeight = 600;
const boardPadding = 5;

export default function AppBoard() {
    const dispatch: Dispatch = useDispatch();
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);
    const pinPadding = 0;

    const pinsCountW = Mosaic.getPinsInLineCount(
        availableWidth - 2 * boardPadding,
        pinSize,
        pinPadding,
    );
    const pinsCountH = Mosaic.getPinsInLineCount(
        availableHeight - 2 * boardPadding,
        pinSize,
        pinPadding,
    );

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
            pinPadding={pinPadding}
            pinsColors={useSelector(selectPinsColors)}
            onSelectedCellChange={(cellInds) => {
                dispatch(setSelectedCell(cellInds));
            }}
        />
    );
}
