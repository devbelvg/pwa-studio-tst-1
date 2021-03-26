import React from 'react';
import { useParams } from 'react-router-dom';

const h1 = {
    textAlign: 'center',
    nargin: '1rem'
};
const wave = {
    ...h1,
    fontSize: '5rem'
};

const GreetingPage = () => {

    const { who = "nobody" } = useParams();
    return (
        <div>
            <h1 style={h1}> Hello, {who}</h1>
            <h2 style={wave}>{"\uD83D\uDC4B"}</h2>
        </div>
    );

}
export default GreetingPage;