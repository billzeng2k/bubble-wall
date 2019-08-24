import React from 'react';
import './tube.css';
import bubble from './bubble.png'
import { store } from '../redux';
import { thisExpression } from '@babel/types';

class Bubble extends React.Component {
    constructor(props) {
        super(props)
        this.state = {on: false, mouseDown: false}
        store.subscribe(() => this.pressedKey = store.getState().keyManager.pressedKey)
    }

    componentDidMount() {
        this.dragImg = new Image(0,0);
        this.dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }

    swapState() {
        this.setState({on: !this.state.on})
        this.props.onChanged()
    }

    render() {
        return (
            <div style={{margin: 'auto', maxWidth: '80px'}}>
                { this.props.label && <p className='label'> { this.props.label } </p>}
                <img 
                    src={bubble} 
                    className='bubble' 
                    style={{opacity: this.state.on ? 1 : 0.3}} 
                    onClick={() => this.swapState()} 
                    onDragStart={(e) => e.dataTransfer.setDragImage(this.dragImg, 0, 0)}
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
