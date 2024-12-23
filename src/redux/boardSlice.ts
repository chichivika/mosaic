import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinShape, PinSizeAlias, GridColors, CellColor } from '../utils/mosaicTypes';
import heartColors from '../utils/defaultPinsColors';
import Mosaic from '../utils/mosaicClass';

export const availableWidth = 1000;
const availableHeight = 600;
export const boardPadding = 5;
export const pinPadding = 0;

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
    pinsColors: heartColors,
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
        clearBoard(state: BoardStateType) {
            const { pinsColors } = state;
            if (pinsColors === null) {
                return;
            }
            pinsColors.forEach((row) => {
                row.forEach((cell) => {
                    cell.color = null;
                });
            });
        },

        resizeBoard(
            state: BoardStateType,
            action: PayloadAction<[pinsCountW: number, pinsCountH: number]>,
        ) {
            const [pinsCountW, pinsCountH] = action.payload;
            const { pinsColors } = state;
            if (pinsColors === null) {
                return;
            }

            const resizedPinsColors = [];
            for (let i = 0; i < pinsCountH; ++i) {
                const row = [];
                for (let j = 0; j < pinsCountW; ++j) {
                    const cell = {
                        color: pinsColors[i]?.[j]?.color || null,
                    };
                    row.push(cell);
                }
                resizedPinsColors.push(row);
            }

            state.pinsColors = resizedPinsColors as GridColors;
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

        downloadImage(state: BoardStateType) {
            const { pinsColors } = state;
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
                pinShape: state.pinShape,
                pinSize: sizeSettings[state.pinSizeAlias],
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
        selectPinsCount(state: BoardStateType) {
            const pinSize = sizeSettings[state.pinSizeAlias];
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
        },
    },
});

export const {
    setPinShape,
    setPinSizeAlias,
    setSelectedCell,
    setPinColor,
    clearBoard,
    resizeBoard,
    downloadImage,
} = boardSlice.actions;
export const {
    selectPinShape,
    selectPinSize,
    selectPinSizeAlias,
    selectPinsColors,
    selectPinsCount,
} = boardSlice.selectors;
export default boardSlice.reducer;
