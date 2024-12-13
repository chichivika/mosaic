import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import SizeSelect from './SizeSelect';
import ShapeSelect from './ShapeSelect';

const StyledToolsCnt = styled.div`
    background-color: ${colors.bgColor};
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
            <ShapeSelect />
            <SizeSelect />
        </StyledToolsCnt>
    );
}

export default ToolPanel;
