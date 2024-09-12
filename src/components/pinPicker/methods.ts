
import { emptyColor } from '@/utils/mosaicColors';
import { PinShape } from '@/utils/mosaicTypes';
import { drawRoundArc, drawSquareArc } from '@/utils/drawUtils';

export function drawPin ({ ctx, pinSize, pinShape }:
    {
        ctx: CanvasRenderingContext2D,
        pinSize: number,
        pinShape: PinShape
    }
) {
  ctx.clearRect(0, 0, pinSize, pinSize);
  ctx.beginPath();
  ctx.fillStyle = emptyColor;
  switch (pinShape) {
    case 'round':
      drawRoundArc({
        ctx,
        cx: pinSize / 2,
        cy: pinSize / 2,
        radius: pinSize / 2
      });
      break;
    case 'square':
      drawSquareArc({
        ctx,
        x: 0,
        y: 0,
        side: pinSize
      });
      break;
  }
  ctx.fill();
}
