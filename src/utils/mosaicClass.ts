import { Point, PinShape, MosaicGrid, MosaicRow, MosaicCell, GridColors } from './mosaicTypes';
import { emptyColor as defaultEmptyColor } from './mosaicPalette';
import {
    drawSquarePin,
    drawRoundPin,
    drawRoundGem,
    drawSquareGem,
    DrawPinParam,
} from './drawUtils';

type MosaicParams = {
    pinsCountW: number;
    pinsCountH: number;
    pinSize: number;
    pinShape: PinShape;
    boardPaddingW: number;
    boardPaddingH: number;
    pinPadding?: number;
    pinsColors?: GridColors | null;
    emptyColor?: string;
    ignoreEmptyCells?: boolean;
};

const defaultPinPadding = 0;
export default class Mosaic {
    static getPinsInLineCount(
        lineWidth: number,
        pinSize: number,
        pinPadding: number = defaultPinPadding,
    ) {
        return Math.floor(lineWidth / (pinSize + 2 * pinPadding));
    }

    public readonly pinsCountW: number;

    public readonly pinsCountH: number;

    public readonly pinSize: number;

    public readonly pinShape: PinShape;

    public readonly boardPaddingW: number;

    public readonly boardPaddingH: number;

    public readonly pinPadding: number;

    public readonly pinsColors: GridColors | null;

    public readonly ignoreEmptyCells: boolean;

    protected readonly _boardWidth: number;

    protected readonly _boardHeight: number;

    protected readonly _emptyColor: string;

    protected readonly _grid: MosaicGrid;

    protected _outerPinSize: number;

    protected _previousSelectedRow: number;

    protected _previousSelectedCol: number;

    constructor(param: MosaicParams) {
        this.pinsCountW = param.pinsCountW;
        this.pinsCountH = param.pinsCountH;

        this.boardPaddingW = param.boardPaddingW;
        this.boardPaddingH = param.boardPaddingH;

        this.pinSize = param.pinSize;
        this.pinShape = param.pinShape;

        this.pinPadding = param.pinPadding ?? defaultPinPadding;
        this._outerPinSize = this.pinSize + 2 * this.pinPadding;

        this._boardWidth = this.pinsCountW * this._outerPinSize + 2 * this.boardPaddingW;
        this._boardHeight = this.pinsCountH * this._outerPinSize + 2 * this.boardPaddingH;

        this.pinsColors = param.pinsColors || null;
        this._emptyColor = param.emptyColor || defaultEmptyColor;
        this.ignoreEmptyCells = param.ignoreEmptyCells || false;

        this._previousSelectedRow = -1;
        this._previousSelectedCol = -1;

        this._grid = this._configGrid();
    }

    public getBoardWidth() {
        return this._boardWidth;
    }

    public getBoardHeight() {
        return this._boardHeight;
    }

    public drawBoard({ ctx }: { ctx: CanvasRenderingContext2D }) {
        this._clearBoard(ctx);
        this._grid.forEach((row: MosaicRow) => {
            row.forEach((cell: MosaicCell) => {
                if (this.ignoreEmptyCells && !cell.color) {
                    return;
                }

                this._drawPin({
                    ctx,
                    cell,
                    isCellSelected: false,
                    pinSize: this.pinSize,
                    emptyColor: this._emptyColor,
                    useStrokeIfNotSelected: this.pinShape === 'square' && this.pinPadding === 0,
                });
            });
        });
    }

    redrawCell({
        ctx,
        isCellSelected,
        cell,
    }: {
        ctx: CanvasRenderingContext2D;
        isCellSelected: boolean;
        cell: MosaicCell;
    }) {
        const { point } = cell;
        ctx.clearRect(point[0], point[1], this.pinSize, this.pinSize);
        this._drawPin({
            ctx,
            cell,
            isCellSelected,
            pinSize: this.pinSize,
            emptyColor: this._emptyColor,
            useStrokeIfNotSelected: this.pinShape === 'square' && this.pinPadding === 0,
        });
    }

    drawSelectedCell({
        ctx,
        selectedCol,
        selectedRow,
    }: {
        ctx: CanvasRenderingContext2D;
        selectedCol: number;
        selectedRow: number;
    }) {
        const previousCell = this._grid[this._previousSelectedRow]?.[this._previousSelectedCol];
        if (previousCell) {
            this.redrawCell({ ctx, cell: previousCell, isCellSelected: false });
        }

        this._previousSelectedRow = selectedRow;
        this._previousSelectedCol = selectedCol;

        const cell = this._grid[selectedRow]?.[selectedCol];
        if (!cell) {
            return;
        }
        this.redrawCell({ ctx, cell, isCellSelected: true });
    }

    public getCellIndsByMouse(x: number, y: number): Point {
        let row = -1;
        let col = -1;

        const { boardPaddingW, boardPaddingH } = this;

        if (x >= boardPaddingW && x <= this._boardWidth - boardPaddingW) {
            col = Math.trunc((x - boardPaddingW) / this._outerPinSize);
        }
        if (y >= boardPaddingH && y <= this._boardHeight - boardPaddingH) {
            row = Math.trunc((y - boardPaddingH) / this._outerPinSize);
        }

        return [row, col];
    }

    protected _clearBoard(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this._boardWidth, this._boardHeight);
    }

    protected _drawPin(param: DrawPinParam) {
        switch (this.pinShape) {
            case 'square':
                drawSquarePin(param);
                break;
            case 'squareGem':
                drawSquareGem(param);
                break;
            case 'roundGem':
                drawRoundGem(param);
                break;
            default:
                drawRoundPin(param);
        }
    }

    protected _configGrid() {
        const { pinsCountW, pinsCountH, boardPaddingW, boardPaddingH, pinsColors, pinPadding } =
            this;

        const grid: MosaicGrid = [];
        for (let i = 0; i < pinsCountH; ++i) {
            const row: MosaicRow = [];
            const y = boardPaddingH + i * this._outerPinSize;

            for (let j = 0; j < pinsCountW; ++j) {
                const x = boardPaddingW + j * this._outerPinSize;

                const color = pinsColors?.[i]?.[j]?.color || null;
                const cell: MosaicCell = {
                    color,
                    outerPoint: [x, y],
                    point: [x + pinPadding, y + pinPadding],
                };
                row.push(cell);
            }
            grid.push(row);
        }

        return grid;
    }
}
