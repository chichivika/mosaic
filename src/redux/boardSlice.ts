import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinShape, PinSizeAlias, GridColors, CellColor } from '../utils/mosaicTypes';

const sizeSettings = {
    xs: 20,
    s: 25,
    m: 30,
    l: 35,
};

type BoardStateType = {
    pinShape: PinShape;
    pinSizeAlias: PinSizeAlias;
    selectedRowIndex: number;
    selectedColIndex: number;
    pinsColors: GridColors | null;
};
const initialState: BoardStateType = {
    pinShape: 'round',
    pinSizeAlias: 'm',
    selectedRowIndex: -1,
    selectedColIndex: -1,
    pinsColors: null,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setPinShape(state: BoardStateType, action: PayloadAction<PinShape>) {
            state.pinShape = action.payload;
        },
        setPinSizeAlias(state: BoardStateType, action: PayloadAction<PinSizeAlias>) {
            state.pinSizeAlias = action.payload;
        },
        setSelectedCell(
            state: BoardStateType,
            action: PayloadAction<[rowIndex: number, colIndex: number]>,
        ) {
            [state.selectedRowIndex, state.selectedColIndex] = action.payload;
        },
        initPinsColors(
            state: BoardStateType,
            action: PayloadAction<{ pinsCountW: number; pinsCountH: number }>,
        ) {
            const pinsColors = [];
            for (let i = 0; i < action.payload.pinsCountH; ++i) {
                const row = [];
                for (let j = 0; j < action.payload.pinsCountW; ++j) {
                    row.push({
                        color: null,
                    });
                }
                pinsColors.push(row);
            }
            state.pinsColors = pinsColors;
        },

        setPinColor(state: BoardStateType, action: PayloadAction<CellColor>) {
            const { selectedRowIndex, selectedColIndex } = state;

            if (state.pinsColors === null || selectedRowIndex < 0 || selectedColIndex < 0) {
                return;
            }

            state.pinsColors[selectedRowIndex][selectedColIndex] = action.payload;
            state.selectedRowIndex = -1;
            state.selectedColIndex = -1;
        },
    },
    selectors: {
        selectPinShape(state: BoardStateType): PinShape {
            return state.pinShape;
        },
        selectPinSizeAlias(state: BoardStateType) {
            return state.pinSizeAlias;
        },
        selectPinSize(state: BoardStateType): number {
            return sizeSettings[state.pinSizeAlias];
        },
        selectPinsColors(state: BoardStateType) {
            return state.pinsColors;
        },
    },
});

export const { setPinShape, setPinSizeAlias, setSelectedCell, initPinsColors, setPinColor } =
    boardSlice.actions;
export const { selectPinShape, selectPinSize, selectPinSizeAlias, selectPinsColors } =
    boardSlice.selectors;
export default boardSlice.reducer;
