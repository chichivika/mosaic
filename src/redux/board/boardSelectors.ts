import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../store';
import Mosaic from '../../utils/mosaicClass';
import { GridColors, MosaicImage, PinShape, RowColors } from '../../utils/mosaicTypes';
import {
    availableHeight,
    availableWidth,
    pinPadding,
    boardPadding,
    getMosaicColorFromImage,
} from './utils';

const selectBoardState = (state: StateType) => state.board;

export function selectPinShape(state: StateType): PinShape {
    const boardState = selectBoardState(state);
    return boardState.pinShape;
}

export function selectPinSize(state: StateType): number {
    const boardState = selectBoardState(state);
    return boardState.pinSize;
}

export function selectMosaicImage(state: StateType): MosaicImage {
    const boardState = selectBoardState(state);
    return boardState.mosaicImage;
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

export const selectPinsColors = createSelector(
    [selectMosaicImage, selectPinsCount],
    (mosaicImage, [pinsCountW, pinsCountH]) => {
        const pinsColors = [];
        for (let i = 0; i < pinsCountH; ++i) {
            const row: RowColors = [];
            pinsColors.push(row);
            for (let j = 0; j < pinsCountW; ++j) {
                row.push({
                    color: getMosaicColorFromImage(mosaicImage, i, j),
                });
            }
        }
        return pinsColors as GridColors;
    },
);
