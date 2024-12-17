import React from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPinShape, selectPinSize } from '../redux/boardSlice';
import Mosaic from '../utils/mosaicClass';
import Board from '../Board';

type Props = {
    availableWidth?: number;
    availableHeight?: number;
    boardPadding?: number;
};
const StyledAppBoard = styled(Board)`
    margin: 10px;
`;

export default function AppBoard({
    availableWidth = 700,
    availableHeight = 500,
    boardPadding = 5,
}: Props) {
    const pinShape = useSelector(selectPinShape);
    const pinSize = useSelector(selectPinSize);

    return (
        <StyledAppBoard
            pinShape={pinShape}
            pinSize={pinSize}
            boardPadding={boardPadding}
            pinsCountW={Mosaic.getPinsInLineCount(availableWidth - 2 * boardPadding, pinSize)}
            pinsCountH={Mosaic.getPinsInLineCount(availableHeight - 2 * boardPadding, pinSize)}
        />
    );
}
