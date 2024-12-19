import React from 'react';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { clearBoard } from '../redux/boardSlice';
import IconButton from '../common/IconButton';

export default function ClearIcon() {
    const dispatch: Dispatch = useDispatch();

    return (
        <IconButton>
            <CancelPresentationIcon
                onClick={() => {
                    dispatch(clearBoard());
                }}
            />
        </IconButton>
    );
}
