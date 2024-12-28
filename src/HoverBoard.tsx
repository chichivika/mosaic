import React, { MouseEvent, useState } from 'react';
import { throttle } from 'lodash';
import Board, { GeneralBoardProps } from './Board';

type MouseIndex = number | null;
export default function HoverBoard(props: GeneralBoardProps) {
    const [mouseX, setMouseX] = useState<MouseIndex>(null);
    const [mouseY, setMouseY] = useState<MouseIndex>(null);

    const clearMousePosition = () => {
        setMouseX(null);
        setMouseY(null);
    };

    return (
        <Board
            {...props}
            mouseX={mouseX}
            mouseY={mouseY}
            onMouseMove={throttle((event: MouseEvent) => {
                setMouseX(event.clientX);
                setMouseY(event.clientY);
            }, 100)}
            onMouseLeave={() => {
                clearMousePosition();
            }}
        />
    );
}
