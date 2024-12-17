import React, { useEffect, useRef, useMemo, useState, RefObject, MouseEvent } from 'react';
import styled from 'styled-components';
import Mosaic from './utils/mosaicClass';
import { PinShape, GridColors } from './utils/mosaicTypes';

type Props = {
    pinsCountW: number;
    pinsCountH: number;
    pinSize: number;
    pinShape: PinShape;
    boardPadding?: number;
    pinsColors?: GridColors | null;
    pinPadding?: number;
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
                boardPaddingW: boardPadding,
                boardPaddingH: boardPadding,
            }),
        [pinShape, pinSize, pinsCountW, pinsCountH, boardPadding, pinsColors, pinPadding],
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
                onMouseMove={(event) =>
                    _calculateSelectedCell(event, mosaic, setSelectedRow, setSelectedCol)
                }
                onMouseLeave={() => _clearSelectedCell(setSelectedRow, setSelectedCol)}
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
