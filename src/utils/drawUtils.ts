import { Point, Points, MosaicCell } from './mosaicTypes';
import { emptyFillColor } from './mosaicPalette';

export type DrawPinParam = {
    ctx: CanvasRenderingContext2D;
    cell: MosaicCell;
    isCellSelected: boolean;
    emptyColor: string;
    pinSize: number;
};

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

export function drawPolygon({ ctx, verts }: { ctx: CanvasRenderingContext2D; verts: Points }) {
    if (verts.length === 0) {
        return;
    }

    drawLines({ ctx, verts });
    ctx.closePath();
}

export function drawLines({ ctx, verts }: { ctx: CanvasRenderingContext2D; verts: Points }) {
    if (verts.length === 0) {
        return;
    }

    verts.forEach((vert, index) => {
        if (index === 0) {
            ctx.moveTo(vert[0], vert[1]);
            return;
        }
        ctx.lineTo(vert[0], vert[1]);
    });
}

export function LightenDarkenColor(hex: string, lum: number) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    let rgb = '#';
    let c;
    let i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += `00${c}`.substr(c.length);
    }

    return rgb;
}

export function drawEmptySquarePin({
    ctx,
    cell,
    isCellSelected,
    emptyColor,
    pinSize,
}: DrawPinParam) {
    const cellColor = emptyColor;

    const { point } = cell;
    const x = point[0];
    const y = point[1];

    ctx.beginPath();
    drawSquareArc({
        ctx,
        x,
        y,
        side: pinSize,
    });

    if (isCellSelected) {
        ctx.strokeStyle = LightenDarkenColor(cellColor, -0.2);
        ctx.fillStyle = emptyFillColor;
        ctx.fill();
    } else {
        ctx.strokeStyle = cellColor;
    }

    ctx.stroke();
}

export function drawSquarePin(param: DrawPinParam) {
    const { ctx, cell, isCellSelected, pinSize } = param;
    if (!cell.color) {
        drawEmptySquarePin(param);
        return;
    }

    const { point } = cell;
    const x = point[0];
    const y = point[1];

    const side = pinSize;
    const outerLeftTop: Point = [x, y];
    const outerRightTop: Point = [x + side, y];
    const outerLeftBottom: Point = [x, y + side];
    const outerRightBottom: Point = [x + side, y + side];

    const innerIndent = side / 3;
    const innerLeftTop: Point = [x + innerIndent, y + innerIndent];
    const innerRightTop: Point = [x + side - innerIndent, y + innerIndent];
    const innerLeftBottom: Point = [x + innerIndent, y + side - innerIndent];
    const innerRightBottom: Point = [x + side - innerIndent, y + side - innerIndent];

    const cellColor = isCellSelected ? LightenDarkenColor(cell.color, -0.2) : cell.color;
    ctx.fillStyle = cellColor;
    ctx.strokeStyle = cellColor;

    ctx.beginPath();
    ctx.fillStyle = LightenDarkenColor(cellColor, 0.1);
    drawPolygon({
        ctx,
        verts: [innerLeftTop, innerRightTop, innerRightBottom, innerLeftBottom],
    });
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = cellColor;
    drawPolygon({ ctx, verts: [outerLeftTop, innerLeftTop, innerRightTop, outerRightTop] });
    ctx.fill();

    drawPolygon({
        ctx,
        verts: [outerLeftBottom, innerLeftBottom, innerRightBottom, outerRightBottom],
    });
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = LightenDarkenColor(cellColor, 0.2);
    drawPolygon({
        ctx,
        verts: [outerRightTop, outerRightBottom, innerRightBottom, innerRightTop],
    });
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = LightenDarkenColor(cellColor, -0.2);
    drawPolygon({
        ctx,
        verts: [outerLeftBottom, outerLeftTop, innerLeftTop, innerLeftBottom],
    });
    ctx.fill();
}

function drawEmptyRoundPin({ ctx, cell, isCellSelected, emptyColor, pinSize }: DrawPinParam) {
    const cellColor = emptyColor;

    const { point } = cell;
    const x = point[0];
    const y = point[1];

    ctx.beginPath();
    drawRoundArc({
        ctx,
        cx: x + pinSize / 2,
        cy: y + pinSize / 2,
        radius: pinSize / 2,
    });

    if (isCellSelected) {
        ctx.strokeStyle = LightenDarkenColor(cellColor, -0.15);
        ctx.fillStyle = emptyFillColor;
        ctx.fill();
    } else {
        ctx.strokeStyle = cellColor;
    }

    ctx.stroke();
}

function rotateVectorOnAngle(vector: Point, angle: number): Point {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [cos * vector[0] - sin * vector[1], sin * vector[0] + cos * vector[1]];
}

function getPointsForHexagon({
    cx,
    cy,
    radius,
}: {
    cx: number;
    cy: number;
    radius: number;
}): Points {
    const hexagonPoints: Points = [];
    for (let i = 0; i < 6; ++i) {
        if (i === 0) {
            hexagonPoints.push([cx + radius, cy]);
            continue;
        }
        const prevPoint = hexagonPoints[i - 1];
        const prevVector: Point = [prevPoint[0] - cx, prevPoint[1] - cy];
        const rotatedVector = rotateVectorOnAngle(prevVector, Math.PI / 3);
        hexagonPoints.push([cx + rotatedVector[0], cy + rotatedVector[1]]);
    }
    return hexagonPoints;
}

export function drawRoundPin(param: DrawPinParam) {
    const { ctx, cell, pinSize, isCellSelected } = param;
    if (cell.color === null) {
        drawEmptyRoundPin(param);
        return;
    }

    const cellColor = isCellSelected ? LightenDarkenColor(cell.color, -0.15) : cell.color;
    const { point } = cell;
    const x = point[0];
    const y = point[1];

    const cx = x + pinSize / 2;
    const cy = y + pinSize / 2;
    const innerHexagonPoints = getPointsForHexagon({
        cx,
        cy,
        radius: pinSize / 4,
    });
    const outerHexagonPoints = getPointsForHexagon({
        cx,
        cy,
        radius: pinSize / 2,
    });

    ctx.beginPath();
    ctx.fillStyle = cellColor;
    drawPolygon({ ctx, verts: innerHexagonPoints });
    ctx.fill();

    const fillStylesIndex = [0.1, -0.1, -0.2, -0.1, 0.1, 0.2];
    innerHexagonPoints.forEach((_hexPoint, i) => {
        ctx.beginPath();
        ctx.fillStyle = LightenDarkenColor(cellColor, fillStylesIndex[i]);
        const nextIndex = i === innerHexagonPoints.length - 1 ? 0 : i + 1;
        drawLines({
            ctx,
            verts: [
                outerHexagonPoints[i],
                innerHexagonPoints[i],
                innerHexagonPoints[nextIndex],
                outerHexagonPoints[nextIndex],
            ],
        });
        const angle = Math.PI / 3;
        ctx.arc(cx, cy, pinSize / 2, i * angle, (i + 1) * angle);
        ctx.fill();
    });
}
