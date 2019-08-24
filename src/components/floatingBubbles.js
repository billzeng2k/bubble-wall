import React from 'react';
import './tube.css';
import bubble from './bubble.png'

const animationTime = 5000
export default class FloatingBubble extends React.Component {
    constructor(props) {
        super(props)
        this.state = {bottom: 0, display: 'block'}
    }

    componentDidMount() {
        setTimeout(() => this.setState({bottom: '100%'}), 100)
        setTimeout(() => this.setState({display: 'none'}), animationTime)
    }

    render() {
        return (
            <img 
                ref={ref=>this.bubble=ref}
                src={bubble} 
                className='floatingBubble' 
                style={{width: (Math.random(1) * 20 + 50) + '%', transform: 'translateX(' + (Math.random(1) * 30 - 15) + '%)', bottom: this.state.bottom, display: this.state.display}}
            />
        );
    }
}
