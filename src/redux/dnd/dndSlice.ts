import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinColor, DraggedType } from '../../utils/mosaicTypes';

type DNDStateType = {
    draggedType: DraggedType;
    draggedColor: PinColor;
    dragStartMouseX: number;
    dragStartMouseY: number;
};
const initialState: DNDStateType = {
    draggedType: null,
    draggedColor: null,
    dragStartMouseX: 0,
    dragStartMouseY: 0,
};

export const dndSlice = createSlice({
    name: 'dnd',
    initialState,
    reducers: {
        initDraggedObject(
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

        clearDraggedObject(state: DNDStateType) {
            Object.assign(state, initialState);
        },
    },
});

export const { initDraggedObject, setMousePosition, clearDraggedObject } = dndSlice.actions;
export default dndSlice.reducer;
