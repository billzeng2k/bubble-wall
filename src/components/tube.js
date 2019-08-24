import React from 'react';
import './tube.css';
import { store } from '../redux';

class Tube extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        store.subscribe(() => this.setState(store.getState()))
    }

    render() {
        return (
            <div className="tube">
                {this.state.bubbleCount}
            </div>
        );
    }
}

export default Tube;
