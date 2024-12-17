import React from 'react';
import { PinShape, PinColor } from '../utils/mosaicTypes';
import Board from '../Board';
import colors from '../styles/colors';

function Pin({
    pinShape = 'round',
    pinSize = 26,
    pinColor = null,
}: {
    pinShape?: PinShape;
    pinSize?: number;
    pinColor?: PinColor;
}) {
    return (
        <Board
            pinsCountH={1}
            pinsCountW={1}
            pinShape={pinShape}
            pinSize={pinSize}
            emptyColor={colors.fontColor}
            pinsColors={[[{ color: pinColor }]]}
        />
    );
}

export default Pin;
