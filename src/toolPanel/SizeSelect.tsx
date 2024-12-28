import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';
import { PinSizeAlias } from '../utils/mosaicTypes';
import MenuItem from '../common/MenuItem';
import { setPinSizeAlias } from '../redux/board/boardSlice';
import { selectPinSizeAlias } from '../redux/board/boardSelectors';
import Select from '../common/Select';
import { selectIsDNDMode } from '../redux/dnd/dndSelectors';

const StyledSizeCnt = styled(Select)`
    width: 72px;
    &.MuiInputBase-root {
        font-size: 1.3rem;
    }
`;
function SizeSelect() {
    const dispatch: Dispatch = useDispatch();
    const sizeAlias = useSelector(selectPinSizeAlias);
    const isDNDMode = useSelector(selectIsDNDMode);

    return (
        <StyledSizeCnt
            size='small'
            value={sizeAlias}
            disabled={isDNDMode}
            onChange={(event) => dispatch(setPinSizeAlias(event.target.value as PinSizeAlias))}
        >
            <MenuItem value='xs'>XS</MenuItem>
            <MenuItem value='s'>S</MenuItem>
            <MenuItem value='m'>M</MenuItem>
            <MenuItem value='l'>L</MenuItem>
        </StyledSizeCnt>
    );
}

export default SizeSelect;
