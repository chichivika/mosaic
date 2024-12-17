import React, { useEffect, useRef, useMemo, useState, RefObject, MouseEvent } from 'react';
import styled from 'styled-components';
import Mosaic from './utils/mosaicClass';
import { PinShape, GridColors } from './utils/mosaicTypes';

type ClickCallback = (rowIndex: number, colIndex: number) => void;
type Props = {
    pinsCountW: number;
    pinsCountH: number;
    pinSize: number;
    pinShape: PinShape;
    boardPadding?: number;
    pinsColors?: GridColors | null;
    pinPadding?: number;
    emptyColor?: string;
    useSelectedStyle?: boolean;
    onClick?: ClickCallback;
};
export const StyledBoardCnt = styled.div`
    display: flex;
    justify-content: center;
    canvas {
        cursor: pointer;
    }
`;
export default function Board({
    pinsCountW,
    pinsCountH,
    pinSize,
    pinShape,
    boardPadding = 5,
    pinsColors = null,
    pinPadding = 0,
    emptyColor,
    useSelectedStyle = false,
    onClick,
}: Props) {
    const boardRef = useRef(null) as RefObject<HTMLCanvasElement>;

    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedCol, setSelectedCol] = useState(-1);

    const mosaic = useMemo(
        () =>
            new Mosaic({
                pinShape,
                pinSize,
                pinsCountW,
                pinsCountH,
                pinsColors,
                pinPadding,
                emptyColor,
                useSelectedStyle,
                boardPaddingW: boardPadding,
                boardPaddingH: boardPadding,
            }),
        [
            pinShape,
            pinSize,
            pinsCountW,
            pinsCountH,
            boardPadding,
            pinsColors,
            pinPadding,
            useSelectedStyle,
            emptyColor,
        ],
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
                width={mosaic.getBoardWidth()}
                height={mosaic.getBoardHeight()}
                onClick={onClick ? (event) => _fireClickEvent(event, mosaic, onClick) : undefined}
                onMouseMove={
                    useSelectedStyle
                        ? (event) =>
                              _calculateSelectedCell(event, mosaic, setSelectedRow, setSelectedCol)
                        : undefined
                }
                onMouseLeave={
                    useSelectedStyle
                        ? () => _clearSelectedCell(setSelectedRow, setSelectedCol)
                        : undefined
                }
            />
        </StyledBoardCnt>
    );
}

function _calculateSelectedCell(
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
function _clearSelectedCell(
    setSelectedRow: React.Dispatch<React.SetStateAction<number>>,
    setSelectedCol: React.Dispatch<React.SetStateAction<number>>,
) {
    setSelectedCol(-1);
    setSelectedRow(-1);
}

function _fireClickEvent(event: MouseEvent, mosaic: Mosaic, onClick: ClickCallback) {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const [row, col] = mosaic.getCellIndsByMouse(mouseX, mouseY);
    onClick(row, col);
}
