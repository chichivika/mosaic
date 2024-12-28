import React from 'react';
import styled from 'styled-components';
import SizeSelect from './SizeSelect';
import ShapeSelect from './ShapeSelect';
import PinPicker from './PinPicker';
import EraserPicker, { StyledEraserPicker } from './EraserPicker';
import ClearIcon from './ClearIcon';
import DownloadIcon from './DownloadIcon';
import { StyledIconButton } from '../common/IconButton';
import { availableWidth } from '../redux/board/utils';

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
        margin-left: 1rem;
        margin: 0.5rem;
    }
    ${StyledIconButton} {
        margin: 0.5rem;
    }
`;

const StyledSelectorsCnt = styled.div`
    display: flex;
`;
function ToolPanel() {
    return (
        <StyledOuterToolsCnt>
            <StyledToolsCnt>
                <StyledSelectorsCnt>
                    <ShapeSelect />
                    <SizeSelect />
                </StyledSelectorsCnt>
                <StyledPickerCnt>
                    <PinPicker />
                    <EraserPicker />
                    <ClearIcon />
                    <DownloadIcon />
                </StyledPickerCnt>
            </StyledToolsCnt>
        </StyledOuterToolsCnt>
    );
}

export default ToolPanel;
