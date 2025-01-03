import { Action, ThunkAction } from '@reduxjs/toolkit';
import { StateType } from './store';
import { selectDraggedType, selectDraggedColor } from './dnd/dndSelectors';
import { selectPinsColors, selectPinSize, selectPinShape } from './board/boardSelectors';
import { setPinColor } from './board/boardSlice';
import { initDraggedObject, clearDraggedObject } from './dnd/dndSlice';
import { pinPadding, boardPadding } from './board/utils';
import Mosaic from '../utils/mosaicClass';

export type AppThunk = ThunkAction<void, StateType, unknown, Action>;

export const handleMosaicBoardClick = ({
    rowIndex,
    colIndex,
    mouseX,
    mouseY,
}: {
    rowIndex: number;
    colIndex: number;
    mouseX: number;
    mouseY: number;
}): AppThunk => {
    return (dispatch, getState) => {
        const state = getState();
        const pinsColors = selectPinsColors(state);
        if (pinsColors === null) {
            return;
        }

        const draggedType = selectDraggedType(state);
        const selectedCell = pinsColors[rowIndex][colIndex];
        if (!selectedCell) {
            return;
        }

        const changeCellColor = (color: string | null) => {
            dispatch(
                setPinColor({
                    rowIndex,
                    colIndex,
                    color,
                }),
            );
        };

        switch (draggedType) {
            case 'eraser':
            case 'pin':
                changeCellColor(selectDraggedColor(state));
                break;
            case 'singlePin':
                changeCellColor(selectDraggedColor(state));
                dispatch(clearDraggedObject());
                break;
            case null:
                if (selectedCell.color === null) {
                    break;
                }
                changeCellColor(null);
                dispatch(
                    initDraggedObject({
                        draggedType: 'singlePin',
                        draggedColor: selectedCell.color,
                        dragStartMouseX: mouseX,
                        dragStartMouseY: mouseY,
                    }),
                );
                break;
            default:
                break;
        }
    };
};

export const downloadImage = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    const pinsColors = selectPinsColors(state);
    if (pinsColors === null) {
        return;
    }

    let minRowIndex = pinsColors.length;
    let maxRowIndex = 0;
    let minColIndex = pinsColors[0].length;
    let maxColIndex = 0;

    pinsColors.forEach((row, rowInd) => {
        row.forEach((cell, colInd) => {
            if (!cell.color) {
                return;
            }

            minRowIndex = rowInd < minRowIndex ? rowInd : minRowIndex;
            maxRowIndex = rowInd > maxRowIndex ? rowInd : maxRowIndex;
            minColIndex = colInd < minColIndex ? colInd : minColIndex;
            maxColIndex = colInd > maxColIndex ? colInd : maxColIndex;
        });
    });

    const imgPinsCountH = maxRowIndex - minRowIndex + 1;
    const imgPinsCountW = maxColIndex - minColIndex + 1;

    if (imgPinsCountW <= 0 || imgPinsCountH <= 0) {
        return;
    }

    let imgPinsColors = pinsColors.slice(minRowIndex, maxRowIndex + 1);
    imgPinsColors = imgPinsColors.map((row) => row.slice(minColIndex, maxColIndex + 1));

    const mosaic = new Mosaic({
        pinPadding,
        pinShape: selectPinShape(state),
        pinSize: selectPinSize(state),
        pinsCountW: imgPinsCountW,
        pinsCountH: imgPinsCountH,
        pinsColors: imgPinsColors,
        ignoreEmptyCells: true,
        boardPaddingW: boardPadding,
        boardPaddingH: boardPadding,
    });

    const canvas = document.createElement('canvas');
    canvas.width = mosaic.getBoardWidth();
    canvas.height = mosaic.getBoardHeight();
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        return;
    }
    mosaic.drawBoard({ ctx });

    const link = document.createElement('a');
    link.download = 'mosaic.png';
    link.href = canvas.toDataURL('image/png', 1);
    link.click();
};
