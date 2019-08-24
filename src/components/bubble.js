import React from 'react';
import './tube.css';
import bubble from './bubble.png'
import { store } from '../redux';
import { thisExpression } from '@babel/types';

class Bubble extends React.Component {
    constructor(props) {
        super(props)
        this.state = {on: false, mouseDown: false}
        store.subscribe(() => {
            this.pressedKey = store.getState().keyManager.pressedKey
            this.setState({bubblesPlaying: store.getState().bubbleManager.bubblesPlaying})
        })
    }

    swapState() {
        this.setState({on: !this.state.on})
        this.props.onChanged()
    }

    render() {
        return (
            <div style={{margin: '0 auto', maxWidth: '80px'}}>
                { this.props.label && <p className='label'> { this.props.label } </p>}
                <img 
                    src={bubble} 
                    className='bubble' 
                    style={{opacity: this.state.on ? 1 : this.state.bubblesPlaying ? 0 : 0.3}} 
                    onClick={() => this.swapState()} 
                    onMouseMove={(e) => {
                        if(this.pressedKey == 16 && !this.state.on)
                            this.swapState()
                        else if(this.pressedKey == 18 && this.state.on)
                            this.swapState()
                    }}
                />
            </div>
        );
    }
}

export default Bubble;
