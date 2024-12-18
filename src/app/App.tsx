import React from 'react';
import { styled, ThemeProvider } from 'styled-components';
import AppHeader from './AppHeader';
import ToolPanel from '../toolPanel/ToolPanel';
import colors from '../styles/colors';
import AppBoard from './AppBoard';
import DraggedObject from '../DraggedObject';

const StyledAppCnt = styled.div`
    color: ${(props) => props.theme.fontColor};
    text-align: center;
    width: 100%;
    height: 100%;
`;

function App() {
    return (
        <ThemeProvider theme={colors}>
            <StyledAppCnt>
                <AppHeader />
                <ToolPanel />
                <AppBoard />
                <DraggedObject />
            </StyledAppCnt>
        </ThemeProvider>
    );
}

export default App;
