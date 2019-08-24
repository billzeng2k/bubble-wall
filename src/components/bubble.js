import React from 'react';
import './tube.css';
import bubble from './bubble.png'

class Bubble extends React.Component {
    render() {
        return (
            <img src={bubble} className='bubble'/>
        );
    }
}

export default Bubble;
