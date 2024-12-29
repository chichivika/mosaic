/* eslint-disable no-console */
import React, { useState, useRef, useEffect, RefObject } from 'react';
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
import { StyledCanvas } from './CanvasIcon';

export default function Bin({
    defaultWidth = 20,
    hoverWidth = 20,
    disabled = false,
    throwedColor = null,
    useWidthAnimation = false,
}: {
    defaultWidth?: number;
    hoverWidth?: number;
    disabled?: boolean;
    throwedColor?: string | null;
    useWidthAnimation?: boolean;
}) {
    const canvasRef = useRef(null) as RefObject<HTMLCanvasElement>;
    const prevWidthRef = useRef<number | null>(null);
    const prevDisabledRef = useRef<boolean>(disabled);
    const [width, setWidth] = useState(defaultWidth);

    const fullWidth = useWidthAnimation ? Math.max(defaultWidth, hoverWidth) + 5 : defaultWidth + 5;
    if (prevDisabledRef.current !== disabled) {
        prevDisabledRef.current = disabled;
        if (disabled) {
            setWidth(defaultWidth);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }

        if (!useWidthAnimation || prevWidthRef.current === null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            _drawBin({ ctx, width, fullWidth, disabled, throwedColor });
            prevWidthRef.current = width;
            return;
        }

        const prevWidth = prevWidthRef.current as number;
        const start = performance.now();
        const duration = 200;
        let animationFrameId: number;

        const animate = () => {
            const timeFraction = (performance.now() - start) / duration;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (timeFraction >= 1) {
                _drawBin({ ctx, width, fullWidth, disabled, throwedColor });
                prevWidthRef.current = width;
                return;
            }

            const newWidth = prevWidth + timeFraction * (width - prevWidth);
            _drawBin({ ctx, width: newWidth, fullWidth, disabled, throwedColor });
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (typeof animationFrameId === 'number') {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [width, fullWidth, throwedColor, disabled, useWidthAnimation]);

    const ignoreHover = !useWidthAnimation || disabled;
    return (
        <StyledCanvas
            ref={canvasRef}
            width={fullWidth}
            height={_getHeight(fullWidth)}
            $disabled={disabled}
            onMouseOver={
                ignoreHover
                    ? undefined
                    : () => {
                          setWidth(hoverWidth);
                      }
            }
            onMouseLeave={
                ignoreHover
                    ? undefined
                    : () => {
                          setWidth(defaultWidth);
                      }
            }
        />
    );
}

function _getHeight(width: number) {
    return (5 * width) / 4;
}

function _drawBin({
    ctx,
    width,
    fullWidth,
    disabled,
    throwedColor,
    isHovered = false,
}: {
    ctx: CanvasRenderingContext2D;
    width: number;
    fullWidth: number;
    disabled: boolean;
    throwedColor: string | null;
    isHovered?: boolean;
}) {
    if (fullWidth < width) {
        return;
    }

    const height = _getHeight(width);
    const fullHeight = _getHeight(fullWidth);
    const xPadding = (fullWidth - width) / 2;
    const yPadding = (fullHeight - height) / 2;

    const leftTop: Point = [xPadding, yPadding];
    const rightTop: Point = [xPadding + width, yPadding];
    const leftBottom: Point = [xPadding + (1 * width) / 8, yPadding + height];
    const rightBottom: Point = [xPadding + (7 * width) / 8, yPadding + height];

    const leftSide = getVectorsDelta(leftBottom, leftTop);
    const rightSide = getVectorsDelta(rightBottom, rightTop);
    const leftCenter = getVectorsSum(leftBottom, leftSide, 1, 0.2);
    const rightCenter = getVectorsSum(rightBottom, rightSide, 1, 0.2);

    const binVerts = [leftTop, rightTop, rightBottom, leftBottom];

    if (throwedColor !== null) {
        ctx.beginPath();
        ctx.fillStyle = disabled ? LightenDarkenColor(throwedColor, 0.5) : throwedColor;
        ctx.arc(
            fullWidth / 2,
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
        if (intersectPoint[0] < leftTop[0]) {
            return getLinesIntersection(startPoint, leftBottom, lineVector, leftSide);
        }
        if (intersectPoint[0] > rightTop[0]) {
            return getLinesIntersection(startPoint, rightBottom, lineVector, rightSide);
        }
        return intersectPoint;
    };

    ctx.beginPath();

    const linesToDraw: Points[] = [];
    for (let i = -1; i < 10; i += 2) {
        let rightPoint: Point | null = getVectorsSum(rightBottom, rightSide, 1, i / 10);

        const topIntersectPoint = getIntersectWithHorisontalLine(rightPoint, leftTop[1], [-1, -1]);
        if (rightPoint[1] > rightBottom[1]) {
            rightPoint = getIntersectWithHorisontalLine(rightPoint, rightBottom[1], [-1, -1]);
        }
        if (topIntersectPoint !== null && rightPoint !== null) {
            linesToDraw.push([rightPoint, topIntersectPoint]);
        }

        let leftPoint: Point | null = getVectorsSum(leftBottom, leftSide, 1, i / 10);
        const leftIntersectPoint = getIntersectWithHorisontalLine(leftPoint, leftTop[1], [1, -1]);
        if (leftPoint[1] > leftBottom[1]) {
            leftPoint = getIntersectWithHorisontalLine(leftPoint, leftBottom[1], [1, -1]);
        }
        if (leftIntersectPoint !== null && leftPoint !== null) {
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
