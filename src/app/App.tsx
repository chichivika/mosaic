import React from 'react';
import { styled, ThemeProvider } from 'styled-components';
import AppHeader from './AppHeader';
import ToolPanel from '../toolPanel/ToolPanel';
import colors from '../styles/colors';
import AppBoard from './AppBoard';

const StyledAppCnt = styled.div`
    color: ${(props) => props.theme.fontColor};
    text-align: center;
    background-color: ${(props) => props.theme.bgColor};
    width: 100vw;
    height: 100vh;
`;

function App() {
    return (
        <ThemeProvider theme={colors}>
            <StyledAppCnt>
                <AppHeader />
                <ToolPanel />
                <AppBoard />
            </StyledAppCnt>
        </ThemeProvider>
    );
}

export default App;
