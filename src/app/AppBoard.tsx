import React from 'react';
import { useSelector } from 'react-redux';
import { selectPinShape, selectPinSize } from '../redux/boardSlice';
import Mosaic from '../utils/mosaicClass';
import Board from '../Board';

type Props = {
    availableWidth?: number;
    availableHeight?: number;
    boardPadding?: number;
};

export default function AppBoard({
    availableWidth = 700,
    availableHeight = 500,
    boardPadding = 5,
}: Props) {
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);

    return (
        <Board
            pinShape={pinShape}
            pinSize={pinSize}
            boardPadding={boardPadding}
            pinsCountW={Mosaic.getPinsInLineCount(availableWidth - 2 * boardPadding, pinSize)}
            pinsCountH={Mosaic.getPinsInLineCount(availableHeight - 2 * boardPadding, pinSize)}
            useSelectedStyle
        />
    );
}
