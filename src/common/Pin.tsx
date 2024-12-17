import React from 'react';
import { PinShape } from '../utils/mosaicTypes';
import Board from '../Board';
import colors from '../styles/colors';

function Pin({ pinShape = 'round', pinSize = 26 }: { pinShape?: PinShape; pinSize?: number }) {
    return (
        <Board
            pinsCountH={1}
            pinsCountW={1}
            pinShape={pinShape}
            pinSize={pinSize}
            emptyColor={colors.fontColor}
        />
    );
}

export default Pin;
