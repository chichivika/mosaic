import React, {
    useEffect,
    useRef,
    useMemo,
    RefObject,
    MouseEvent,
    MutableRefObject,
    WheelEvent,
} from 'react';
import styled from 'styled-components';
import Mosaic from './utils/mosaicClass';
import { PinShape, GridColors } from './utils/mosaicTypes';

export type BoardClickEventObject = {
    rowIndex: number;
    colIndex: number;
    rectLeft: number;
    rectTop: number;
    mouseX: number;
    mouseY: number;
    color: string | null;
};
export type BoardClickCallback = (param: BoardClickEventObject) => void;
export type GeneralBoardProps = {
    pinsCountW: number;
    pinsCountH: number;
    pinSize: number;
    pinShape: PinShape;
    boardPadding?: number;
    pinsColors?: GridColors | null;
    pinPadding?: number;
    emptyColor?: string;
    onClick?: BoardClickCallback;
    onWheel?: (param: WheelEvent) => void;
};
type BoardProps = GeneralBoardProps & {
    mouseX?: number | null;
    mouseY?: number | null;
    onMouseMove?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
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
    pinPadding = 2,
    emptyColor,
    mouseX = null,
    mouseY = null,
    onClick,
    onMouseMove,
    onMouseLeave,
    onWheel,
}: BoardProps) {
    const boardRef = useRef(null) as RefObject<HTMLCanvasElement>;
    const prevSelectedCellRef = useRef([-1, -1]);
    const prevMosaicRef: MutableRefObject<Mosaic | null> = useRef(null);

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
            emptyColor,
        ],
    );

    useEffect(() => {
        const canvas = boardRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas?.getContext('2d');
        if (!ctx) {
            return;
        }

        if (prevMosaicRef.current !== mosaic) {
            prevMosaicRef.current = mosaic;
            mosaic.drawBoard({
                ctx,
            });
        }

        const [selectedRow, selectedCol] = _calculateSelectedCell({
            mouseX,
            mouseY,
            mosaic,
            canvas,
        });

        const [prevRow, prevCol] = prevSelectedCellRef.current;
        if (prevRow !== selectedRow || prevCol !== selectedCol) {
            prevSelectedCellRef.current = [selectedRow, selectedCol];
            mosaic.drawSelectedCell({
                ctx,
                selectedCol,
                selectedRow,
            });
        }
    }, [boardRef, mouseX, mouseY, mosaic]);

    return (
        <StyledBoardCnt onWheel={onWheel}>
            <canvas
                ref={boardRef}
                width={mosaic.getBoardWidth()}
                height={mosaic.getBoardHeight()}
                onClick={
                    onClick
                        ? (event) => _fireClickEvent(event, mosaic, onClick, pinsColors)
                        : undefined
                }
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            />
        </StyledBoardCnt>
    );
}

function _calculateSelectedCell({
    mouseX,
    mouseY,
    mosaic,
    canvas,
}: {
    mouseX: number | null;
    mouseY: number | null;
    mosaic: Mosaic;
    canvas: HTMLCanvasElement;
}) {
    const emptySelection = [-1, -1];
    if (mouseX === null || mouseY === null) {
        return emptySelection;
    }
    const rect = canvas.getBoundingClientRect();
    if (mouseX < rect.left || mouseX > rect.right) {
        return emptySelection;
    }
    if (mouseY < rect.top || mouseY > rect.bottom) {
        return emptySelection;
    }
    return mosaic.getCellIndsByMouse(mouseX - rect.left, mouseY - rect.top);
}

function _fireClickEvent(
    event: MouseEvent,
    mosaic: Mosaic,
    onClick: BoardClickCallback,
    pinsColors: GridColors | null,
) {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const [rowIndex, colIndex] = mosaic.getCellIndsByMouse(mouseX, mouseY);
    onClick({
        rowIndex,
        colIndex,
        rectLeft: rect.left,
        rectTop: rect.top,
        mouseX: event.clientX,
        mouseY: event.clientY,
        color: pinsColors?.[rowIndex]?.[colIndex]?.color || null,
    });
}
