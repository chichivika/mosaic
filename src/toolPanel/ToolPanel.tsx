import React from 'react';
import styled from 'styled-components';
import SizeSelect from './SizeSelect';
import ShapeSelect from './ShapeSelect';
import PinPicker from './PinPicker';
import EraserPicker, { StyledEraserPicker } from './EraserPicker';

const StyledToolsCnt = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    padding-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & > * {
        margin: 0px 2rem;
    }
`;

const StyledPickerCnt = styled.div`
    display: flex;
    ${StyledEraserPicker} {
        margin: 1rem;
    }
`;
function ToolPanel() {
    return (
        <StyledToolsCnt>
            <StyledPickerCnt>
                <PinPicker />
                <EraserPicker />
            </StyledPickerCnt>
            <ShapeSelect />
            <SizeSelect />
        </StyledToolsCnt>
    );
}

export default ToolPanel;
