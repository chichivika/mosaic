import React from 'react';
import styled from 'styled-components';
import { PinShape } from '../utils/mosaicTypes';

export const StyledPin = styled.div<{
    $radius: string;
    $color: string;
    $size?: string;
    $margin?: string;
}>`
    background-color: ${(props) => props.$color};
    border-radius: ${(props) => props.$radius};
    width: ${(props) => props.$size};
    height: ${(props) => props.$size};
    margin: ${(props) => props.$margin};
`;

function Pin({
    shape = 'round',
    color = 'grey',
    size = '27px',
    margin = '',
}: {
    shape?: PinShape;
    color?: string;
    size?: string;
    margin?: string;
}) {
    return (
        <StyledPin
            $radius={_getBorderRadiusByShape(shape)}
            $color={color}
            $size={size}
            $margin={margin}
        />
    );
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
