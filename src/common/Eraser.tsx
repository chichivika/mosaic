import React, { useRef, useEffect, RefObject, useState } from 'react';
import styled from 'styled-components';
import { drawRectangle, drawLines, LightenDarkenColor } from '../utils/drawUtils';
import colors from '../styles/colors';

export const StyledCanvas = styled.canvas`
    cursor: pointer;
`;
export default function Eraser({
    width = 28,
    useHoverStyle = false,
}: {
    width?: number;
    useHoverStyle?: boolean;
}) {
    const canvasRef = useRef(null) as RefObject<HTMLCanvasElement>;
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        _drawEraser(ctx, width, isHovered);
    }, [width, isHovered]);

    return (
        <StyledCanvas
            ref={canvasRef}
            width={width}
            height={width}
            onMouseMove={
                useHoverStyle
                    ? () => {
                          setIsHovered(true);
                      }
                    : undefined
            }
            onMouseLeave={
                useHoverStyle
                    ? () => {
                          setIsHovered(false);
                      }
                    : undefined
            }
        />
    );
}

function _drawEraser(ctx: CanvasRenderingContext2D, width: number, isHovered: boolean) {
    const height = (7 * width) / 8;
    ctx.strokeStyle = colors.fontColor;
    ctx.fillStyle = colors.fontColor;

    ctx.beginPath();
    drawRectangle({
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
    drawLines({
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
        ctx.strokeStyle = LightenDarkenColor(colors.fontColor, -20);
        drawRectangle({
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
