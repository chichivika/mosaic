
import { emptyColor } from '@/utils/mosaicColors';
import { PinShape } from '@/utils/mosaicTypes';
import { drawRoundArc, drawSquareArc } from '@/utils/drawUtils';

export function drawPin ({ ctx, pinSize, pinShape, color, x }:
    {
        ctx: CanvasRenderingContext2D,
        pinSize: number,
        pinShape: PinShape,
        color: string | null,
        x: number
    }
) {
  ctx.beginPath();
  ctx.fillStyle = color ?? emptyColor;
  switch (pinShape) {
    case 'round':
      drawRoundArc({
        ctx,
        cx: x + pinSize / 2,
        cy: pinSize / 2,
        radius: pinSize / 2
      });
      break;
    case 'square':
      drawSquareArc({
        ctx,
        x,
        y: 0,
        side: pinSize
      });
      break;
  }
  ctx.fill();
}
