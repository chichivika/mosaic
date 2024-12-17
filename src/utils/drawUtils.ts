export function drawRoundArc({
    ctx,
    cx,
    cy,
    radius,
}: {
    ctx: CanvasRenderingContext2D;
    cx: number;
    cy: number;
    radius: number;
}) {
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
}

export function drawSquareArc({
    ctx,
    x,
    y,
    side,
}: {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    side: number;
}) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + side, y);
    ctx.lineTo(x + side, y + side);
    ctx.lineTo(x, y + side);
    ctx.closePath();
}

export function LightenDarkenColor(color: string, amt: number) {
    let usePound = false;

    if (color[0] === '#') {
        color = color.slice(1);
        usePound = true;
    }

    const num = parseInt(color, 16);

    // eslint-disable-next-line no-bitwise
    let r = (num >> 16) + amt;

    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }

    // eslint-disable-next-line no-bitwise
    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }

    // eslint-disable-next-line no-bitwise
    let g = (num & 0x0000ff) + amt;

    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }

    // eslint-disable-next-line no-bitwise
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}
