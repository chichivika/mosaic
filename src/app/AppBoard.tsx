import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resizeBoard } from '../redux/board/boardSlice';
import {
    selectPinShape,
    selectPinSize,
    selectPinsColors,
    selectPinsCount,
} from '../redux/board/boardSelectors';
import HoverBoard from '../HoverBoard';
import { BoardClickEventObject } from '../Board';
import { handleMosaicBoardClick } from '../redux/thunk';
import { AppDispatch } from '../redux/store';
import { boardPadding, pinPadding } from '../redux/board/utils';

export default function AppBoard() {
    const dispatch: AppDispatch = useDispatch();
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);
    const [pinsCountW, pinsCountH] = useSelector(selectPinsCount);

    useEffect(() => {
        dispatch(resizeBoard([pinsCountW, pinsCountH]));
    }, [pinsCountW, pinsCountH, dispatch]);

    return (
        <HoverBoard
            pinShape={pinShape}
            pinSize={pinSize}
            boardPadding={boardPadding}
            pinsCountW={pinsCountW}
            pinsCountH={pinsCountH}
            pinPadding={pinPadding}
            pinsColors={useSelector(selectPinsColors)}
            onClick={(event: BoardClickEventObject) => {
                dispatch(
                    handleMosaicBoardClick({
                        rowIndex: event.rowIndex,
                        colIndex: event.colIndex,
                        mouseX: event.mouseX,
                        mouseY: event.mouseY,
                    }),
                );
            }}
        />
    );
}
