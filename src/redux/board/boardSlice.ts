import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinShape, PinSizeAlias, GridColors } from '../../utils/mosaicTypes';
import heartColors from '../../utils/defaultPinsColors';
import Mosaic from '../../utils/mosaicClass';
import { sizeSettings, pinPadding, boardPadding } from './utils';

type BoardStateType = {
    pinShape: PinShape;
    pinSizeAlias: PinSizeAlias;
    pinsColors: GridColors | null;
};
const initialState: BoardStateType = {
    pinShape: 'round',
    pinSizeAlias: 'm',
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

        setPinColor(
            state: BoardStateType,
            action: PayloadAction<{
                rowIndex: number;
                colIndex: number;
                color: string | null;
            }>,
        ) {
            const { rowIndex, colIndex, color } = action.payload;
            if (state.pinsColors === null || rowIndex < 0 || colIndex < 0) {
                return;
            }

            if (state.pinsColors[rowIndex][colIndex].color === color) {
                return;
            }

            state.pinsColors[rowIndex][colIndex] = { color };
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
});

export const { setPinShape, setPinSizeAlias, setPinColor, clearBoard, resizeBoard, downloadImage } =
    boardSlice.actions;
export default boardSlice.reducer;
