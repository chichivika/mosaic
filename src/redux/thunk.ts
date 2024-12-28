import { Action, ThunkAction } from '@reduxjs/toolkit';
import { StateType } from './store';
import { selectDraggedType, selectDraggedColor } from './dnd/dndSelectors';
import { selectPinsColors } from './board/boardSelectors';
import { setPinColor } from './board/boardSlice';
import { initDraggedObject, clearDraggedObject } from './dnd/dndSlice';

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
