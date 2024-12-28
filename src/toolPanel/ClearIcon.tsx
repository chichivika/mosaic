import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Tooltip,
} from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard } from '../redux/board/boardSlice';
import IconButton from '../common/IconButton';
import Button from '../common/Button';
import { selectIsDNDMode } from '../redux/dnd/dndSelectors';

export default function ClearIcon() {
    const dispatch: Dispatch = useDispatch();
    const [isDialogOpen, setDialogIsOpen] = useState(false);
    const isDNDMode = useSelector(selectIsDNDMode);

    return (
        <>
            <Tooltip title='Clear the board'>
                <IconButton disabled={isDNDMode}>
                    <CancelPresentationIcon
                        onClick={() => {
                            setDialogIsOpen(true);
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Dialog
                open={isDialogOpen}
                onClose={() => {
                    setDialogIsOpen(false);
                }}
            >
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>Clear the board?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setDialogIsOpen(false);
                        }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(clearBoard());
                            setDialogIsOpen(false);
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
