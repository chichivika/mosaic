import React from 'react';
import styled from 'styled-components';
import { PinShape } from '../utils/mosaicTypes';

const StyledCnt = styled.div<{ $radius: string; $color: string; $margin?: string }>`
    background-color: ${(props) => props.$color};
    border-radius: ${(props) => props.$radius};
    width: 20px;
    height: 20px;
    margin: ${(props) => props.$margin};
`;

function Pin({
    shape = 'round',
    color = 'grey',
    margin = '',
}: {
    shape?: PinShape;
    color?: string;
    margin?: string;
}) {
    return <StyledCnt $radius={_getBorderRadiusByShape(shape)} $color={color} $margin={margin} />;
}

function _getBorderRadiusByShape(shape: PinShape) {
    switch (shape) {
        case 'round':
            return '50%';
        default:
            return '0%';
    }
}

export default Pin;
