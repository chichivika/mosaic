import React from 'react';
import CanvasIcon from './CanvasIcon';
import colors from '../styles/colors';
import {
    drawPolygon,
    LightenDarkenColor,
    getVectorsDelta,
    getVectorsSum,
    drawLines,
    getLinesIntersection,
} from '../utils/drawUtils';
import { Point, Points } from '../utils/mosaicTypes';

export default function Bin({
    width = 20,
    useHoverStyle = false,
    disabled = false,
    throwedColor = null,
}: {
    width?: number;
    useHoverStyle?: boolean;
    disabled?: boolean;
    throwedColor?: string | null;
}) {
    const height = (5 * width) / 4;
    return (
        <CanvasIcon
            useHoverStyle={useHoverStyle}
            width={width}
            height={height + 1}
            disabled={disabled}
            onDrawIcon={(param) => {
                _drawBin({ ...param, width, height, disabled, throwedColor });
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
    throwedColor,
}: {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    isHovered: boolean;
    disabled: boolean;
    throwedColor: string | null;
}) {
    const leftTop: Point = [0, 0];
    const rightTop: Point = [width, 0];
    const leftBottom: Point = [(1 * width) / 8, height];
    const rightBottom: Point = [(7 * width) / 8, height];

    const leftSide = getVectorsDelta(leftBottom, leftTop);
    const rightSide = getVectorsDelta(rightBottom, rightTop);
    const leftCenter = getVectorsSum(leftBottom, leftSide, 1, 0.2);
    const rightCenter = getVectorsSum(rightBottom, rightSide, 1, 0.2);

    const binVerts = [leftTop, rightTop, rightBottom, leftBottom];

    if (throwedColor !== null) {
        ctx.beginPath();
        ctx.fillStyle = disabled ? LightenDarkenColor(throwedColor, 0.5) : throwedColor;
        ctx.arc(
            width / 2,
            rightCenter[1],
            0.4 * (rightCenter[0] - leftCenter[0]),
            0,
            Math.PI,
            true,
        );
        ctx.fill();
    }

    ctx.strokeStyle = colors.fontColor;
    ctx.fillStyle = colors.fontColor;

    if (disabled) {
        ctx.strokeStyle = LightenDarkenColor(colors.fontColor, 0.5);
        ctx.fillStyle = LightenDarkenColor(colors.fontColor, 0.5);
    } else if (isHovered) {
        ctx.strokeStyle = LightenDarkenColor(colors.fontColor, -0.2);
    }

    const getIntersectWithHorisontalLine = (
        startPoint: Point,
        yValue: number,
        lineVector: Point,
    ): Point | null => {
        const intersectPoint = [
            startPoint[0] + ((yValue - startPoint[1]) * lineVector[0]) / lineVector[1],
            yValue,
        ] as Point;
        if (intersectPoint[0] < 0) {
            return getLinesIntersection(startPoint, leftBottom, lineVector, leftSide);
        }
        if (intersectPoint[0] > width) {
            return getLinesIntersection(startPoint, rightBottom, lineVector, rightSide);
        }
        return intersectPoint;
    };

    ctx.beginPath();

    const linesToDraw: Points[] = [];
    for (let i = -10; i < 10; i += 2) {
        const rightPoint = getVectorsSum(rightBottom, rightSide, 1, i / 10);
        const topIntersectPoint = getIntersectWithHorisontalLine(rightPoint, 0, [-1, -1]);
        if (topIntersectPoint !== null) {
            linesToDraw.push([rightPoint, topIntersectPoint]);
        }

        const leftPoint = getVectorsSum(leftBottom, leftSide, 1, i / 10);
        const leftIntersectPoint = getIntersectWithHorisontalLine(leftPoint, 0, [1, -1]);
        if (leftIntersectPoint !== null) {
            linesToDraw.push([leftPoint, leftIntersectPoint]);
        }
    }

    drawLines({
        ctx,
        lines: linesToDraw,
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
