import React from 'react';
import CanvasIcon from './CanvasIcon';
import colors from '../styles/colors';
import { drawPolygon, drawLinesChain, LightenDarkenColor } from '../utils/drawUtils';

export default function Eraser({
    width = 28,
    useHoverStyle = false,
}: {
    width?: number;
    useHoverStyle?: boolean;
}) {
    const height = (7 * width) / 8;
    return (
        <CanvasIcon
            useHoverStyle={useHoverStyle}
            width={width}
            height={height + 5}
            onDrawIcon={(param) => {
                _drawEraser({ ...param, width, height });
            }}
        />
    );
}

function _drawEraser({
    ctx,
    width,
    height,
    isHovered,
}: {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    isHovered: boolean;
}) {
    ctx.strokeStyle = colors.fontColor;
    ctx.fillStyle = colors.fontColor;

    ctx.beginPath();
    drawPolygon({
        ctx,
        verts: [
            [width / 4, (3 * height) / 7],
            [(5 * width) / 8, 0],
            [width, (3 * height) / 7],
            [(5 * width) / 8, (6 * height) / 7],
        ],
    });
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = colors.bgColor;
    drawLinesChain({
        ctx,
        verts: [
            [width / 4, (3 * height) / 7],
            [0, (5 * height) / 7],
            [width / 4, height],
            [width / 2, height],
            [(5 * width) / 8, (6 * height) / 7],
        ],
    });
    ctx.fill();
    ctx.stroke();

    if (isHovered) {
        ctx.beginPath();
        ctx.strokeStyle = LightenDarkenColor(colors.fontColor, -0.2);
        drawPolygon({
            ctx,
            verts: [
                [(5 * width) / 8, 0],
                [0, (5 * height) / 7],
                [width / 4, height],
                [width / 2, height],
                [width, (3 * height) / 7],
            ],
        });
        ctx.stroke();
    }
}
