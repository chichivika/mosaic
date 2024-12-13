import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinShape, PinSize } from '../utils/mosaicTypes';

type BoardStateType = {
    pinShape: PinShape;
    pinSize: PinSize;
};
const initialState: BoardStateType = {
    pinShape: 'round',
    pinSize: 'm',
};

export const counterSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setPinShape(state: BoardStateType, action: PayloadAction<PinShape>) {
            state.pinShape = action.payload;
        },
        setPinSize(state: BoardStateType, action: PayloadAction<PinSize>) {
            state.pinSize = action.payload;
        },
    },
    selectors: {
        selectPinShape(state: BoardStateType) {
            return state.pinShape;
        },
        selectPinSize(state: BoardStateType) {
            return state.pinSize;
        },
    },
});

export const { setPinShape, setPinSize } = counterSlice.actions;
export const { selectPinShape, selectPinSize } = counterSlice.selectors;
export default counterSlice.reducer;
