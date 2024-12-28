import React, { useState } from 'react';
import styled from 'styled-components';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '../common/IconButton';
import { colorsPalette } from '../utils/mosaicPalette';
import { PinShape, Palette } from '../utils/mosaicTypes';
import { selectPinShape } from '../redux/board/boardSelectors';
import { initDraggedObject } from '../redux/dnd/dndSlice';
import { BoardClickEventObject } from '../Board';
import HoverBoard from '../HoverBoard';

const StyledCnt = styled.div`
    background-color: inherit;
    display: flex;
    align-content: center;
    align-items: center;
    canvas {
        cursor: pointer;
    }
`;
type Props = {
    viewPinsCount?: number;
    pinSize?: number;
};
function PinPicker({ viewPinsCount = 6, pinSize = 28 }: Props = {}) {
    const dispatch: Dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const pinShape: PinShape = useSelector(selectPinShape);
    const pagesCount = _getPagesCount(viewPinsCount, colorsPalette.length);

    const pinsToDraw = _getPinsToDraw(viewPinsCount, currentPage, pagesCount);
    return (
        <StyledCnt>
            <IconButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <ChevronLeftIcon />
            </IconButton>
            <HoverBoard
                pinsCountW={viewPinsCount}
                pinsCountH={1}
                pinShape={pinShape}
                pinSize={pinSize}
                pinPadding={4}
                pinsColors={[pinsToDraw]}
                boardPadding={0}
                onClick={(param: BoardClickEventObject) => {
                    _startDragEvent({
                        eventParam: param,
                        pinsToDraw,
                        dispatch,
                    });
                }}
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

function _startDragEvent({
    eventParam,
    pinsToDraw,
    dispatch,
}: {
    eventParam: BoardClickEventObject;
    pinsToDraw: Palette;
    dispatch: Dispatch;
}) {
    dispatch(
        initDraggedObject({
            draggedType: 'pin',
            draggedColor: pinsToDraw[eventParam.colIndex].color,
            dragStartMouseX: eventParam.mouseX,
            dragStartMouseY: eventParam.mouseY,
        }),
    );
}

function _getPinsToDraw(viewPinsCount: number, currentPage: number, pagesCount: number) {
    let startIndex: number;
    if (currentPage !== pagesCount) {
        startIndex = (currentPage - 1) * viewPinsCount;
    } else {
        startIndex = colorsPalette.length - viewPinsCount;
    }

    return colorsPalette.slice(startIndex, startIndex + viewPinsCount);
}

function _getPagesCount(viewPinsCount: number, paletteCount: number) {
    return Math.ceil(paletteCount / viewPinsCount);
}

export default PinPicker;
