import React from 'react';
import styled from 'styled-components';
import ShapeSelect from './ShapeSelect';
import PinPicker from './PinPicker';
import EraserPicker, { StyledEraserPicker } from './EraserPicker';
import ClearIcon from './ClearIcon';
import DownloadIcon from './DownloadIcon';
import { availableWidth } from '../redux/board/utils';
import ColorBin, { StyledBinCnt } from './ColorBin';
import { StyledIconButton } from '../common/IconButton';

const StyledOuterToolsCnt = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`;
const StyledToolsCnt = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: ${availableWidth}px;
    padding: 0px 2rem;
    box-sizing: border-box;
`;

const StyledPickerCnt = styled.div`
    display: flex;
    ${StyledEraserPicker} {
        margin: 0.5rem;
    }
    ${StyledBinCnt} {
        margin: 0.5rem;
    }
`;

const StyledToolCnt = styled.div`
    ${StyledIconButton} {
        margin: 0.5rem;
    }
`;

function ToolPanel() {
    return (
        <StyledOuterToolsCnt>
            <StyledToolsCnt>
                <StyledPickerCnt>
                    <ShapeSelect />
                    <PinPicker />
                    <EraserPicker />
                    <ColorBin />
                </StyledPickerCnt>
                <StyledToolCnt>
                    <ClearIcon />
                    <DownloadIcon />
                </StyledToolCnt>
            </StyledToolsCnt>
        </StyledOuterToolsCnt>
    );
}

export default ToolPanel;
