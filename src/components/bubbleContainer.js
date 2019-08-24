import React from 'react';
import './tube.css';
import { store } from '../redux';
import Bubble from './bubble'
import _ from 'lodash'

class BubbleContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        this.bubbles = _.map(Array(this.state.bubbleCount), () => <Bubble/>)
        store.subscribe(() => this.setState(store.getState()))
    }



    render() {
        return (
            <div className="tube" style={{backgroundImage: 'none'}}>
                {this.bubbles}
            </div>
        );
    }
}

export default BubbleContainer;
