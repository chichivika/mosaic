import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../store';
import Mosaic from '../../utils/mosaicClass';
import { PinShape } from '../../utils/mosaicTypes';
import { availableHeight, availableWidth, pinPadding, boardPadding } from './utils';

const selectBoardState = (state: StateType) => state.board;

export function selectPinShape(state: StateType): PinShape {
    const boardState = selectBoardState(state);
    return boardState.pinShape;
}

export function selectPinSize(state: StateType): number {
    const boardState = selectBoardState(state);
    return boardState.pinSize;
}

export function selectPinsColors(state: StateType) {
    const boardState = selectBoardState(state);
    return boardState.pinsColors;
}

export const selectPinsCount = createSelector([selectPinSize], (pinSize) => {
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
    return [pinsCountW, pinsCountH];
});
