import { emptyColor, hoverColor } from '@/utils/mosaicColors';

export function drawRoundArc (
  { ctx, cx, cy, radius } :
    {ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number}) {
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
}

export function drawSquareArc (
  { ctx, x, y, side } :
      {ctx: CanvasRenderingContext2D, x: number, y: number, side: number}) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + side, y);
  ctx.lineTo(x + side, y + side);
  ctx.lineTo(x, y + side);
  ctx.closePath();
}
