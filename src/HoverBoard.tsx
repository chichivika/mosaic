import React, { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Board, { GeneralBoardProps } from './Board';
import { selectDraggedType, selectMouseX, selectMouseY } from './redux/dndSlice';

type MouseIndex = number | null;
type HoverBoardProps = GeneralBoardProps & {
    concernsForDND?: boolean;
};
export default function HoverBoard(props: HoverBoardProps) {
    const { concernsForDND = false, ...boardProps } = props;

    const [mouseX, setMouseX] = useState<MouseIndex>(null);
    const [mouseY, setMouseY] = useState<MouseIndex>(null);

    const draggedType = useSelector(selectDraggedType);
    const dragMouseX = useSelector(selectMouseX);
    const dragMouseY = useSelector(selectMouseY);
    const isDNDMode = concernsForDND && draggedType !== null;

    useEffect(() => {
        setMouseX(null);
        setMouseY(null);
    }, [isDNDMode]);

    return (
        <Board
            {...boardProps}
            mouseX={isDNDMode ? dragMouseX : mouseX}
            mouseY={isDNDMode ? dragMouseY : mouseY}
            onMouseMove={
                isDNDMode
                    ? undefined
                    : (event: MouseEvent) => {
                          setMouseX(event.clientX);
                          setMouseY(event.clientY);
                      }
            }
            onMouseLeave={
                isDNDMode
                    ? undefined
                    : () => {
                          setMouseX(null);
                          setMouseY(null);
                      }
            }
        />
    );
}
