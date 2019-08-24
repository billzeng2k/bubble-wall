import React from 'react';
import './tube.css';
import { store } from '../redux';
import Bubble from './bubble'
import _ from 'lodash'
import { step } from '../globals'

class BubbleContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState().bubbleManager
        this.bubbleState = Array.apply(null, Array(this.state.bubbleCount)).map(() => false)
        this.bubbles = _.map(_.keys(Array(this.state.bubbleCount)), (key) => <Bubble key={key} onChanged={() => this.onBubblePressed(key)} label={this.props.label ? (key * step / 1000) + 's' : null}/>)
        store.subscribe(() => {
            this.changeBubbleCount(store.getState().bubbleManager.bubbleCount - this.state.bubbleCount)
        })
    }

    changeBubbleCount(diff) {
        if(diff > 0) {
            this.bubbles = _.union(
                this.bubbles,
                _.map(_.keys(Array(this.state.diff)), (key) => {
                    key = parseInt(key)+parseInt(this.state.bubbleCount) + 1
                    return <Bubble key={key} onChanged={() => this.onBubblePressed(key)} label={this.props.label ? (key * step / 1000) + 's' : null}/>
                })
            )
        } else if (diff < 0) {
            this.bubbles.pop()
        }
        this.setState({bubbleCount: this.state.bubbleCount + diff})
    }

    onBubblePressed(index) {
        this.bubbleState[index] = !this.bubbleState[index]
    }

    tubeToCommand() {
        let command = [{open: this.bubbleState[0], time: 0}]
        for(let i = 1; i < this.bubbleState.length; i++)
            if(this.bubbleState[i] ^ this.bubbleState[i-1])
                command.push({open: this.bubbleState[i], time: i * step})
        return command
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
