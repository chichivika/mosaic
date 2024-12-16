import React, { useEffect, useRef, useMemo, useState, RefObject, MouseEvent } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPinShape, selectPinSize } from './redux/boardSlice';
import Mosaic from './utils/mosaicClass';

type Props = {
    width?: number;
    height?: number;
};
const sizeSettings = {
    s: 24,
    m: 30,
    l: 45,
};
export const StyledBoardCnt = styled.div`
    display: flex;
    justify-content: center;
`;
export default function Board({ width = 700, height = 500 }: Props) {
    const canvasWidth = Math.max(width, 150);
    const canvasHeight = Math.max(height, 150);

    const pinSize = useSelector(selectPinSize);
    const pinShape = useSelector(selectPinShape);
    const boardRef = useRef(null) as RefObject<HTMLCanvasElement>;

    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedCol, setSelectedCol] = useState(-1);

    const mosaic = useMemo(
        () =>
            new Mosaic({
                width,
                height,
                pinShape,
                pinSize: sizeSettings[pinSize],
            }),
        [width, height, pinSize, pinShape],
    );

    useEffect(() => {
        if (!boardRef.current) {
            return;
        }
        const ctx = boardRef.current.getContext('2d');
        if (ctx === null) {
            return;
        }

        mosaic.drawBoard({
            ctx,
            selectedCol,
            selectedRow,
        });
    }, [mosaic, selectedRow, selectedCol]);

    return (
        <StyledBoardCnt>
            <canvas
                ref={boardRef}
                width={canvasWidth}
                height={canvasHeight}
                onMouseMove={(event) =>
                    calculateSelectedCell(event, mosaic, setSelectedRow, setSelectedCol)
                }
                onMouseLeave={() => clearSelectedCell(setSelectedRow, setSelectedCol)}
            />
        </StyledBoardCnt>
    );
}

function calculateSelectedCell(
    event: MouseEvent,
    mosaic: Mosaic,
    setSelectedRow: React.Dispatch<React.SetStateAction<number>>,
    setSelectedCol: React.Dispatch<React.SetStateAction<number>>,
) {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const [row, col] = mosaic.getCellIndsByMouse(mouseX, mouseY);
    setSelectedCol(col);
    setSelectedRow(row);
}
function clearSelectedCell(
    setSelectedRow: React.Dispatch<React.SetStateAction<number>>,
    setSelectedCol: React.Dispatch<React.SetStateAction<number>>,
) {
    setSelectedCol(-1);
    setSelectedRow(-1);
}
