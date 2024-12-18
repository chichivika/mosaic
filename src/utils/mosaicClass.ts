import { Point, PinShape, MosaicGrid, MosaicRow, MosaicCell, GridColors } from './mosaicTypes';
import { emptyColor as defaultEmptyColor } from './mosaicPalette';
import { drawRoundArc, drawSquareArc, drawLines, LightenDarkenColor } from './drawUtils';

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

    protected readonly _boardWidth: number;

    protected readonly _boardHeight: number;

    protected readonly _emptyColor: string;

    protected readonly _grid: MosaicGrid;

    protected _outerPinSize: number;

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

        this._grid = this._configGrid();
    }

    public getBoardWidth() {
        return this._boardWidth;
    }

    public getBoardHeight() {
        return this._boardHeight;
    }

    public drawBoard({
        ctx,
        selectedCol = -1,
        selectedRow = -1,
    }: {
        ctx: CanvasRenderingContext2D;
        selectedCol: number;
        selectedRow: number;
    }) {
        this._clearBoard(ctx);
        this._grid.forEach((row: MosaicRow, i: number) => {
            row.forEach((cell: MosaicCell, j: number) => {
                ctx.lineWidth = 1;
                const cellColor = cell.color || this._emptyColor;
                ctx.fillStyle = cellColor;
                ctx.strokeStyle = cellColor;
                const isCellSelected = i === selectedRow && j === selectedCol;

                ctx.beginPath();
                this._drawPin(ctx, cell, i, j, isCellSelected);
                if (!cell.color && !isCellSelected) {
                    ctx.stroke();
                } else if (cell.color) {
                    ctx.fill();
                }

                if (isCellSelected) {
                    ctx.strokeStyle = LightenDarkenColor(cellColor, -40);
                    if (!cell.color) {
                        ctx.fillStyle = '#e9e9e9';
                        ctx.lineWidth = 1.5;
                        ctx.fill();
                    }
                    ctx.stroke();
                }
            });
        });
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

    protected _drawPin(
        ctx: CanvasRenderingContext2D,
        cell: MosaicCell,
        i: number,
        j: number,
        isSelected: boolean,
    ) {
        switch (this.pinShape) {
            case 'square':
                this._drawSquarePin(ctx, cell, i, j, isSelected);
                break;
            default:
                this._drawRoundPin(ctx, cell);
        }
    }

    protected _drawRoundPin(ctx: CanvasRenderingContext2D, cell: MosaicCell) {
        const { point } = cell;
        const cx = point[0] + this.pinSize / 2;
        const cy = point[1] + this.pinSize / 2;

        drawRoundArc({
            ctx,
            cx,
            cy,
            radius: this.pinSize / 2,
        });
    }

    protected _drawSquarePin(
        ctx: CanvasRenderingContext2D,
        cell: MosaicCell,
        i: number,
        j: number,
        isSelected: boolean,
    ) {
        const { point } = cell;
        const x = point[0];
        const y = point[1];

        const leftTop = [x, y] as Point;
        const rightTop = [x + this.pinSize, y] as Point;
        const leftBottom = [x, y + this.pinSize] as Point;
        const rightBottom = [x + this.pinSize, y + this.pinSize] as Point;

        if (isSelected || (i === 0 && j === 0)) {
            drawSquareArc({
                ctx,
                x,
                y,
                side: this.pinSize,
            });
            return;
        }
        if (i === 0) {
            drawLines({ ctx, verts: [leftTop, rightTop, rightBottom, leftBottom] });
            return;
        }
        if (j === 0) {
            drawLines({ ctx, verts: [leftTop, leftBottom, rightBottom, rightTop] });
            return;
        }

        drawLines({ ctx, verts: [leftBottom, rightBottom, rightTop] });
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
