import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import IconButton, { StyledIconButton } from '../common/IconButton';
import { selectIsDNDMode } from '../redux/dnd/dndSelectors';
import { increasePinSize } from '../redux/board/boardSlice';

const StyledZoomTool = styled.div`
    display: inline-block;
    ${StyledIconButton}: {
        margin: 0.3rem;
    }
`;
export default function ZoomTool() {
    const dispatch: AppDispatch = useDispatch();
    const isDNDMode = useSelector(selectIsDNDMode);

    return (
        <StyledZoomTool>
            <Tooltip title='Zoom out'>
                <IconButton disabled={isDNDMode}>
                    <RemoveCircleOutlineOutlinedIcon
                        onClick={() => {
                            dispatch(increasePinSize(false));
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Tooltip title='Zoom in'>
                <IconButton disabled={isDNDMode}>
                    <AddCircleOutlineOutlinedIcon
                        onClick={() => {
                            dispatch(increasePinSize(true));
                        }}
                    />
                </IconButton>
            </Tooltip>
        </StyledZoomTool>
    );
}
