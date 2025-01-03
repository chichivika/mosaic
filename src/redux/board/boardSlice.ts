import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinShape, MosaicImage } from '../../utils/mosaicTypes';
import heartImage from '../../utils/defaultMosaicImage';
import { minPinSize, maxPinSize, pinSizeStep, getMosaicCellIndexFromImage } from './utils';

type BoardStateType = {
    pinShape: PinShape;
    pinSize: number;
    mosaicImage: MosaicImage;
};
const initialState: BoardStateType = {
    pinShape: 'round',
    pinSize: 30,
    mosaicImage: heartImage,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setPinShape(state: BoardStateType, action: PayloadAction<PinShape>) {
            state.pinShape = action.payload;
        },
        increasePinSize(state: BoardStateType, action: PayloadAction<boolean>) {
            const coeff = action.payload ? 1 : -1;
            const newPinSize = state.pinSize + coeff * pinSizeStep;
            if (newPinSize < minPinSize || newPinSize > maxPinSize) {
                return;
            }
            state.pinSize = newPinSize;
        },
        clearBoard(state: BoardStateType) {
            state.mosaicImage = [];
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
            if (rowIndex < 0 || colIndex < 0) {
                return;
            }

            const cellIndex = getMosaicCellIndexFromImage(state.mosaicImage, rowIndex, colIndex);
            const mosaicCell = state.mosaicImage[cellIndex] || null;
            const oldColor = mosaicCell?.color || null;

            if (oldColor === color) {
                return;
            }

            if (mosaicCell === null && color !== null) {
                state.mosaicImage.push({
                    rowIndex,
                    colIndex,
                    color,
                });
                return;
            }

            if (color === null) {
                state.mosaicImage.splice(cellIndex, 1);
                return;
            }

            mosaicCell.color = color;
        },
    },
});

export const { setPinShape, increasePinSize, setPinColor, clearBoard } = boardSlice.actions;
export default boardSlice.reducer;
