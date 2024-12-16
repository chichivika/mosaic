import React from 'react';
import { styled, ThemeProvider } from 'styled-components';
import AppHeader from './AppHeader';
import ToolPanel from '../toolPanel/ToolPanel';
import Board, { StyledBoardCnt } from '../Board';
import colors from '../styles/colors';

const StyledAppCnt = styled.div`
    color: ${(props) => props.theme.fontColor};
    text-align: center;
    background-color: ${(props) => props.theme.bgColor};
    width: 100vw;
    height: 100vh;
    ${StyledBoardCnt} {
        margin: 10px;
    }
`;

function App() {
    return (
        <ThemeProvider theme={colors}>
            <StyledAppCnt>
                <AppHeader />
                <ToolPanel />
                <Board />
            </StyledAppCnt>
        </ThemeProvider>
    );
}

export default App;
