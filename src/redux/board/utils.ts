import { MosaicImage, MosaicImageCell } from '../../utils/mosaicTypes';

export const availableWidth = 1000;
export const availableHeight = 600;
export const boardPadding = 5;
export const pinPadding = 0;

export const minPinSize = 20;
export const maxPinSize = 50;
export const pinSizeStep = 2;

export const getMosaicCellFromImage = (
    mosaicImage: MosaicImage,
    rowIndex: number,
    colIndex: number,
): MosaicImageCell | null => {
    return (
        mosaicImage.find((cell) => cell.rowIndex === rowIndex && cell.colIndex === colIndex) || null
    );
};
export const getMosaicCellIndexFromImage = (
    mosaicImage: MosaicImage,
    rowIndex: number,
    colIndex: number,
): number => {
    if (mosaicImage === null) {
        return -1;
    }
    return mosaicImage.findIndex(
        (cell) => cell.rowIndex === rowIndex && cell.colIndex === colIndex,
    );
};
export const getMosaicColorFromImage = (
    mosaicImage: MosaicImage,
    rowIndex: number,
    colIndex: number,
): string | null => {
    const foundCell = getMosaicCellFromImage(mosaicImage, rowIndex, colIndex);
    return foundCell?.color || null;
};
