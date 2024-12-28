import React from 'react';
import CanvasIcon from './CanvasIcon';
import colors from '../styles/colors';
import {
    drawPolygon,
    LightenDarkenColor,
    getVectorsDelta,
    getVectorsSum,
    drawLines,
} from '../utils/drawUtils';
import { Point } from '../utils/mosaicTypes';

export default function Bin({
    width = 20,
    useHoverStyle = false,
    disabled = false,
}: {
    width?: number;
    useHoverStyle?: boolean;
    disabled?: boolean;
}) {
    const height = (5 * width) / 4;
    return (
        <CanvasIcon
            useHoverStyle={useHoverStyle}
            width={width}
            height={height + 1}
            disabled={disabled}
            onDrawIcon={(param) => {
                _drawBin({ ...param, width, height, disabled });
            }}
        />
    );
}

function _drawBin({
    ctx,
    width,
    height,
    isHovered,
    disabled,
}: {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    isHovered: boolean;
    disabled: boolean;
}) {
    ctx.strokeStyle = colors.fontColor;
    ctx.fillStyle = colors.fontColor;

    if (disabled) {
        ctx.strokeStyle = LightenDarkenColor(colors.fontColor, 0.5);
        ctx.fillStyle = LightenDarkenColor(colors.fontColor, 0.5);
    } else if (isHovered) {
        ctx.strokeStyle = LightenDarkenColor(colors.fontColor, -0.2);
    }

    const leftTop: Point = [0, 0];
    const rightTop: Point = [width, 0];
    const leftBottom: Point = [(3 * width) / 16, height];
    const rightBottom: Point = [(13 * width) / 16, height];

    const leftSide = getVectorsDelta(leftBottom, leftTop);
    const rightSide = getVectorsDelta(rightBottom, rightTop);
    const leftCenter = getVectorsSum(leftBottom, leftSide, 1, 0.2);
    const rightCenter = getVectorsSum(rightBottom, rightSide, 1, 0.2);

    const binVerts = [leftTop, rightTop, rightBottom, leftBottom];

    ctx.beginPath();
    drawLines({
        ctx,
        lines: [
            [
                [width / 4, leftCenter[1]],
                [width / 4, 0],
            ],
            [
                [width / 2, leftCenter[1]],
                [width / 2, 0],
            ],
            [
                [(3 * width) / 4, rightCenter[1]],
                [(3 * width) / 4, 0],
            ],
            [
                getVectorsSum(leftBottom, leftSide, 1, 0.4),
                getVectorsSum(rightBottom, rightSide, 1, 0.4),
            ],
            [
                getVectorsSum(leftBottom, leftSide, 1, 0.6),
                getVectorsSum(rightBottom, rightSide, 1, 0.6),
            ],
            [
                getVectorsSum(leftBottom, leftSide, 1, 0.8),
                getVectorsSum(rightBottom, rightSide, 1, 0.8),
            ],
        ],
    });
    ctx.stroke();

    ctx.beginPath();
    drawPolygon({
        ctx,
        verts: [leftCenter, rightCenter, rightBottom, leftBottom],
    });
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    drawPolygon({
        ctx,
        verts: binVerts,
    });
    ctx.stroke();

    if (!disabled && isHovered) {
        ctx.beginPath();
        drawPolygon({
            ctx,
            verts: binVerts,
        });
        ctx.stroke();
    }
}
