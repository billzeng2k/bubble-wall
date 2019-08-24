import React from 'react';
import './tube.css';
import bubble from './bubble.png'

class Bubble extends React.Component {
    constructor(props) {
        super(props)
        this.state = {on: false}
    }

    render() {
        return (
            <img src={bubble} className='bubble' style={{opacity: this.state.on ? 1 : 0.3}} onClick={() => this.setState({on: !this.state.on})} onDragStart={(e) => {e.preventDefault()}}/>
        );
    }
}

export default Bubble;
