import React, { useRef, useEffect, RefObject, useState } from 'react';
import styled from 'styled-components';

type DrawCallbackType = (param: { ctx: CanvasRenderingContext2D; isHovered: boolean }) => void;

export const StyledCanvas = styled.canvas<{ $disabled: boolean }>`
    cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
`;
export default function CanvasIcon({
    onDrawIcon,
    width = 28,
    height = 28,
    useHoverStyle = false,
    disabled = false,
}: {
    onDrawIcon: DrawCallbackType;
    width?: number;
    height?: number;
    useHoverStyle?: boolean;
    disabled?: boolean;
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
        onDrawIcon({ ctx, isHovered });
    }, [width, isHovered, onDrawIcon]);

    return (
        <StyledCanvas
            ref={canvasRef}
            width={width}
            height={height}
            $disabled={disabled}
            onMouseOver={
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
