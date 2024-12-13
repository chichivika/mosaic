import React from 'react';
import styled from 'styled-components';
import AppHeader from './AppHeader';

const StyledAppCnt = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
`;

function App() {
    return (
        <StyledAppCnt>
            <AppHeader />
        </StyledAppCnt>
    );
}

export default App;
