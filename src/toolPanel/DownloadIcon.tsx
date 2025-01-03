import React from 'react';
import { Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { downloadImage } from '../redux/thunk';
import IconButton from '../common/IconButton';
import { selectIsDNDMode } from '../redux/dnd/dndSelectors';

export default function DownloadIcon() {
    const dispatch: AppDispatch = useDispatch();
    const isDNDMode = useSelector(selectIsDNDMode);

    return (
        <Tooltip title='Download your image'>
            <IconButton disabled={isDNDMode}>
                <FileDownloadIcon
                    onClick={() => {
                        dispatch(downloadImage());
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}
