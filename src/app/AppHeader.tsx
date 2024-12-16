import React from 'react';
import styled from 'styled-components';

const HeaderCnt = styled.div`
    font-size: 2rem;
    padding: 1rem;
    font-weight: bold;
    .m {
        color: grey;
    }
    .o {
        color: #ffae92;
    }
    .s {
        color: darkgrey;
    }
    .a {
        color: lightgrey;
    }
    .i {
        color: rgb(67, 67, 67);
    }
    .c {
        color: rgb(168, 168, 168);
    }
`;

function AppHeader() {
    return (
        <HeaderCnt>
            <span className='m'>M </span>
            <span className='o'>O </span>
            <span className='s'>S </span>
            <span className='a'>A </span>
            <span className='i'>I </span>
            <span className='c'>C</span>
        </HeaderCnt>
    );
}

export default AppHeader;
