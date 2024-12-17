import React from 'react';
import styled from 'styled-components';
import SizeSelect from './SizeSelect';
import ShapeSelect from './ShapeSelect';
import PinPicker from './PinPicker';
import Eraser, { StyledEraserCnt } from './Eraser';

const StyledToolsCnt = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & > * {
        margin: 0px 2rem;
    }
`;

const StyledPickerCnt = styled.div`
    display: flex;
    ${StyledEraserCnt} {
        margin: 10px;
    }
`;
function ToolPanel() {
    return (
        <StyledToolsCnt>
            <StyledPickerCnt>
                <PinPicker />
                <Eraser />
            </StyledPickerCnt>
            <ShapeSelect />
            <SizeSelect />
        </StyledToolsCnt>
    );
}

export default ToolPanel;
