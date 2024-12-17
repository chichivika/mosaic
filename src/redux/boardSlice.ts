import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinShape, PinSizeAlias, PinColor } from '../utils/mosaicTypes';

type BoardStateType = {
    pinShape: PinShape;
    pinSizeAlias: PinSizeAlias;
    draggedColor: PinColor;
};
const initialState: BoardStateType = {
    pinShape: 'round',
    pinSizeAlias: 'm',
    draggedColor: null,
};

export const counterSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setPinShape(state: BoardStateType, action: PayloadAction<PinShape>) {
            state.pinShape = action.payload;
        },
        setPinSizeAlias(state: BoardStateType, action: PayloadAction<PinSizeAlias>) {
            state.pinSizeAlias = action.payload;
        },
        setDraggedColor(state: BoardStateType, action: PayloadAction<PinColor>) {
            state.draggedColor = action.payload;
        },
    },
    selectors: {
        selectPinShape(state: BoardStateType) {
            return state.pinShape;
        },
        selectPinSizeAlias(state: BoardStateType) {
            return state.pinSizeAlias;
        },
        selectPinSize(state: BoardStateType) {
            const sizeSettings = {
                s: 24,
                m: 30,
                l: 45,
            };
            return sizeSettings[state.pinSizeAlias];
        },
        selectDraggedColor(state: BoardStateType) {
            return state.draggedColor;
        },
    },
});

export const { setPinShape, setPinSizeAlias, setDraggedColor } = counterSlice.actions;
export const { selectPinShape, selectPinSize, selectPinSizeAlias, selectDraggedColor } =
    counterSlice.selectors;
export default counterSlice.reducer;
