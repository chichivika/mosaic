import React from 'react';
import styled from 'styled-components';
import SizeSelect from './SizeSelect';
import ShapeSelect from './ShapeSelect';
import PinPicker from './PinPicker';

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

function ToolPanel() {
    return (
        <StyledToolsCnt>
            <PinPicker />
            <ShapeSelect />
            <SizeSelect />
        </StyledToolsCnt>
    );
}

export default ToolPanel;
