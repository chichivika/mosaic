
import { Point, PinShape, MosaicGrid, MosaicRow, MosaicCell } from './mosaicTypes';
import { emptyColor, hoverColor } from './mosaicColors';
import { drawRoundArc, drawSquareArc } from './drawUtils';

type MosaicParams = {
    width: number,
    height: number,
    pinSize: number,
    pinShape: PinShape
};

export default class Mosaic {
    static minCountW: 3;
    static minCountH: 3;
    static settingsByShape = {
      round: {
        padding: 1
      },
      square: {
        padding: 4
      }
    };

    public readonly width: number;
    public readonly height: number;
    public readonly pinSize: number;
    public readonly pinShape: PinShape;

    protected readonly _grid: MosaicGrid;
    protected _paddingW = 0;
    protected _paddingH = 0;
    protected _pinPadding: number;
    protected _innerPinSize: number;

    constructor (param: MosaicParams) {
      this.width = param.width;
      this.height = param.height;
      this.pinSize = param.pinSize;
      this.pinShape = param.pinShape;

      this._pinPadding = Mosaic.settingsByShape[this.pinShape].padding;
      this._innerPinSize = this.pinSize - 2 * this._pinPadding;

      this._grid = this._configGrid();
    }

    public drawBoard ({
      ctx,
      selectedCol = -1,
      selectedRow = -1
    }: {
      ctx: CanvasRenderingContext2D,
      selectedCol: number,
      selectedRow: number
    }) {
      ctx.fillStyle = emptyColor;
      ctx.strokeStyle = hoverColor;

      ctx.clearRect(0, 0, this.width, this.height);
      this._grid.forEach((row: MosaicRow, i: number) => {
        row.forEach((cell: MosaicCell, j: number) => {
          ctx.beginPath();
          this._drawPin(ctx, cell);
          ctx.fill();

          if (i === selectedRow && j === selectedCol) {
            ctx.stroke();
          }
        })
      })
    }

    public getCellIndsByMouse (x: number, y: number): Point {
      let row = -1;
      let col = -1;

      if (x >= this._paddingW && x <= this.width - this._paddingW) {
        col = Math.trunc((x - this._paddingW) / this.pinSize);
      }
      if (y >= this._paddingH && y <= this.height - this._paddingH) {
        row = Math.trunc((y - this._paddingH) / this.pinSize);
      }

      return [row, col];
    }

    protected _drawPin (ctx: CanvasRenderingContext2D, cell: MosaicCell) {
      switch (this.pinShape) {
        case 'round':
          this._drawRoundPin(ctx, cell);
          break;
        case 'square':
          this._drawSquarePin(ctx, cell);
          break;
      }
    }

    protected _drawRoundPin (ctx: CanvasRenderingContext2D, cell: MosaicCell) {
      const point = cell.point;
      const cx = point[0] + this._innerPinSize / 2;
      const cy = point[1] + this._innerPinSize / 2;

      drawRoundArc({
        ctx,
        cx,
        cy,
        radius: this._innerPinSize / 2
      });
    }

    protected _drawSquarePin (ctx: CanvasRenderingContext2D, cell: MosaicCell) {
      const point = cell.point;
      const x = point[0];
      const y = point[1];

      drawSquareArc({
        ctx,
        x,
        y,
        side: this._innerPinSize
      });
    }

    protected _configGrid () {
      let pinsCountW = Math.floor(this.width / this.pinSize);
      let paddingW = 0;
      if (pinsCountW < Mosaic.minCountW) {
        pinsCountW = Mosaic.minCountW;
      } else {
        paddingW = (this.width - pinsCountW * this.pinSize) / 2;
      }
      this._paddingW = paddingW;

      let pinsCountH = Math.floor(this.height / this.pinSize);
      let paddingH = 0;
      if (pinsCountH < Mosaic.minCountH) {
        pinsCountH = Mosaic.minCountH;
      } else {
        paddingH = (this.height - pinsCountH * this.pinSize) / 2;
      }
      this._paddingH = paddingH;

      const grid: MosaicGrid = [];
      const pinPadding = Mosaic.settingsByShape[this.pinShape].padding;
      for (let i = 0; i < pinsCountH; ++i) {
        const row: MosaicRow = [];
        for (let j = 0; j < pinsCountW; ++j) {
          const x = paddingW + pinPadding + j * this.pinSize;
          const y = paddingH + pinPadding + i * this.pinSize;

          const cell: MosaicCell = {
            point: [x, y],
            color: null
          };
          row.push(cell);
        }
        grid.push(row);
      }

      return grid;
    }
}
