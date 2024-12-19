import React from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { downloadImage } from '../redux/boardSlice';
import IconButton from '../common/IconButton';

export default function DownloadIcon() {
    const dispatch: Dispatch = useDispatch();

    return (
        <IconButton>
            <FileDownloadIcon
                onClick={() => {
                    dispatch(downloadImage());
                }}
            />
        </IconButton>
    );
}
