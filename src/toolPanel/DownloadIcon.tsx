import React from 'react';
import { Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { downloadImage } from '../redux/boardSlice';
import IconButton from '../common/IconButton';

export default function DownloadIcon() {
    const dispatch: Dispatch = useDispatch();

    return (
        <Tooltip title='Download your image'>
            <IconButton>
                <FileDownloadIcon
                    onClick={() => {
                        dispatch(downloadImage());
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}
