import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../store';

const selectDNDState = (state: StateType) => state.dnd;

export function selectDraggedType(state: StateType) {
    const dndState = selectDNDState(state);
    return dndState.draggedType;
}

export const selectIsDNDMode = createSelector(
    [selectDraggedType],
    (draggedType) => draggedType !== null,
);

export function selectDraggedColor(state: StateType) {
    const dndState = selectDNDState(state);
    return dndState.draggedColor;
}

export function selectDragStartMouseX(state: StateType) {
    const dndState = selectDNDState(state);
    return dndState.dragStartMouseX;
}

export function selectDragStartMouseY(state: StateType) {
    const dndState = selectDNDState(state);
    return dndState.dragStartMouseY;
}
