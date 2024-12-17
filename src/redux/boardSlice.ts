import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinShape, PinSizeAlias } from '../utils/mosaicTypes';

type BoardStateType = {
    pinShape: PinShape;
    pinSizeAlias: PinSizeAlias;
};
const initialState: BoardStateType = {
    pinShape: 'round',
    pinSizeAlias: 'm',
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
    },
});

export const { setPinShape, setPinSizeAlias } = counterSlice.actions;
export const { selectPinShape, selectPinSize, selectPinSizeAlias } = counterSlice.selectors;
export default counterSlice.reducer;
