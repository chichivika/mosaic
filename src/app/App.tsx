import React from 'react';
import styled from 'styled-components';
import AppHeader from './AppHeader';
import ToolPanel from '../toolPanel/ToolPanel';
import colors from '../styles/colors';

const StyledAppCnt = styled.div`
    color: ${colors.fontColor};
    text-align: center;
    background-color: ${colors.bgColor};
    width: 100vw;
    height: 100vh;
`;

function App() {
    return (
        <StyledAppCnt>
            <AppHeader />
            <ToolPanel />
        </StyledAppCnt>
    );
}

export default App;
