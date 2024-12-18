import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinColor, DraggedType } from '../utils/mosaicTypes';

type DNDStateType = {
    draggedType: DraggedType;
    draggedColor: PinColor;
    dragStartMouseX: number;
    dragStartMouseY: number;
    mouseX: number;
    mouseY: number;
};
const initialState: DNDStateType = {
    draggedType: null,
    draggedColor: null,
    dragStartMouseX: 0,
    dragStartMouseY: 0,
    mouseX: 0,
    mouseY: 0,
};

export const dndSlice = createSlice({
    name: 'dnd',
    initialState,
    reducers: {
        initDragObject(
            state: DNDStateType,
            action: PayloadAction<{
                draggedType: DraggedType;
                draggedColor: PinColor;
                dragStartMouseX: number;
                dragStartMouseY: number;
            }>,
        ) {
            Object.assign(state, action.payload);
        },

        setMousePosition(
            state: DNDStateType,
            action: PayloadAction<{ mouseX: number; mouseY: number }>,
        ) {
            Object.assign(state, action.payload);
        },

        clearDragObject(state: DNDStateType) {
            Object.assign(state, initialState);
        },
    },
    selectors: {
        selectDraggedType(state: DNDStateType) {
            return state.draggedType;
        },
        selectDraggedColor(state: DNDStateType) {
            return state.draggedColor;
        },
        selectDragStartMouseX(state: DNDStateType) {
            return state.dragStartMouseX;
        },
        selectDragStartMouseY(state: DNDStateType) {
            return state.dragStartMouseY;
        },
        selectMouseX(state: DNDStateType) {
            return state.mouseX;
        },
        selectMouseY(state: DNDStateType) {
            return state.mouseY;
        },
    },
});

export const { initDragObject, setMousePosition, clearDragObject } = dndSlice.actions;
export const {
    selectDraggedType,
    selectDraggedColor,
    selectDragStartMouseX,
    selectDragStartMouseY,
    selectMouseX,
    selectMouseY,
} = dndSlice.selectors;
export default dndSlice.reducer;
