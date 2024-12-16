import React, { useState, useRef, useEffect, RefObject } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '../common/IconButton';
import { colorsPalette } from '../utils/mosaicPalette';
import { PinShape } from '../utils/mosaicTypes';
import { drawRoundArc, drawSquareArc } from '../utils/drawUtils';
import { selectPinShape } from '../redux/boardSlice';

const StyledCnt = styled.div`
    background-color: inherit;
    display: flex;
    align-content: center;
    align-items: center;
`;
type Props = {
    viewPinsCount?: number;
    pinSize?: number;
    pinIndent?: number;
};
function PinPicker({ viewPinsCount = 3, pinSize = 27, pinIndent = 5 }: Props = {}) {
    const [currentPage, setCurrentPage] = useState(1);
    const pinShape: PinShape = useSelector(selectPinShape);
    const canvasRef = useRef(null) as RefObject<HTMLCanvasElement>;
    const pagesCount = _getPagesCount(viewPinsCount, colorsPalette.length);

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
        _drawPinsOnCanvas({
            pinSize,
            pinShape,
            pinIndent,
            viewPinsCount,
            currentPage,
            ctx,
        });
    });

    return (
        <StyledCnt>
            <IconButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <ChevronLeftIcon />
            </IconButton>
            <canvas
                ref={canvasRef}
                width={_getCanvasWidth(viewPinsCount, pinSize, pinIndent)}
                height={pinSize}
            />
            <IconButton
                disabled={currentPage === pagesCount}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                <ChevronRightIcon />
            </IconButton>
        </StyledCnt>
    );
}

function _drawPinsOnCanvas({
    pinSize,
    pinShape,
    pinIndent,
    viewPinsCount,
    currentPage,
    ctx,
}: {
    pinSize: number;
    pinShape: PinShape;
    pinIndent: number;
    viewPinsCount: number;
    currentPage: number;
    ctx: CanvasRenderingContext2D;
}) {
    let startIndex: number;
    if (currentPage !== colorsPalette.length) {
        startIndex = (currentPage - 1) * viewPinsCount;
    } else {
        startIndex = colorsPalette.length - viewPinsCount;
    }

    const colorsToDraw = colorsPalette.slice(startIndex, startIndex + viewPinsCount);
    colorsToDraw.forEach((colorData, index) => {
        _drawPinOnCanvas({
            ctx,
            color: colorData.color,
            pinSize,
            pinShape,
            x: index * (pinSize + pinIndent),
        });
    });
}

function _drawPinOnCanvas({
    ctx,
    color,
    pinSize,
    pinShape,
    x,
}: {
    ctx: CanvasRenderingContext2D;
    color: string;
    pinSize: number;
    pinShape: PinShape;
    x: number;
}) {
    ctx.beginPath();
    ctx.fillStyle = color;
    switch (pinShape) {
        case 'square':
            drawSquareArc({
                ctx,
                x,
                y: 0,
                side: pinSize,
            });
            break;
        default:
            drawRoundArc({
                ctx,
                cx: x + pinSize / 2,
                cy: pinSize / 2,
                radius: pinSize / 2,
            });
    }
    ctx.fill();
}

function _getCanvasWidth(viewPinsCount: number, pinSize: number, pinIndent: number) {
    return pinSize * viewPinsCount + pinIndent * (viewPinsCount - 1);
}
function _getPagesCount(viewPinsCount: number, paletteCount: number) {
    return Math.ceil(paletteCount / viewPinsCount);
}

export default PinPicker;
