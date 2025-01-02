import React, { useEffect, WheelEvent, WheelEventHandler } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { throttle } from 'lodash';
import { resizeBoard, increasePinSize } from '../redux/board/boardSlice';
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

    const handleWheel: WheelEventHandler = throttle((event: WheelEvent) => {
        if (event.ctrlKey) {
            return;
        }
        event.preventDefault();
        const needIncrease = event.deltaY < 0;
        dispatch(increasePinSize(needIncrease));
    });

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
            onWheel={handleWheel}
        />
    );
}
