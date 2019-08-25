import React from 'react';
import './tube.css';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import {changeColor} from '../globals'
import FloatingBubbles from './floatingBubbles'
import _ from 'lodash'

class Tube extends React.Component {
    constructor(props) {
        super(props)
        this.state = {on: false, bubbles: []}
        changeColor(this.props.id, window.ledColors[this.props.id])
        this.bubblesCount = 0
    }

    generateBubbles() {
        let item = <FloatingBubbles className='floatingBubbles' key={this.bubblesCount++}/>
        this.setState({bubbles: _.union(this.state.bubbles, [item])})
        this.generator = setInterval(() => {
            let item = <FloatingBubbles className='floatingBubbles' key={this.bubblesCount++}/>
            this.setState({bubbles: _.union(this.state.bubbles, [item])})
        }, 250)
    }

    render() {
        return (
            <div className="tube bottomAlignedLabel">
                { 
                    this.props.label != null && 
                    <KeyHandler
                        keyEventName={KEYDOWN}
                        keyValue={this.props.label+""}
                        onKeyHandle={(e) => {
                            if(!this.state.on) {
                                this.props.activateCallback(true, this.props.label)
                                this.generateBubbles()
                                this.setState({on: true})
                            }
                        }}
                    />
                }
                {
                    this.props.label != null &&
                    <KeyHandler
                        keyEventName={KEYUP}
                        keyValue={this.props.label+""}
                        onKeyHandle={(e) => {
                            if(this.state.on) {
                                this.props.activateCallback(false, this.props.label)
                                clearInterval(this.generator)
                                this.setState({on: false})
                            }
                        }}
                    />
                }
                { this.state.bubbles }
                <p> {this.props.label && this.props.label + " (" + this.props.note + ")"} </p>
                <div className="led-color" style={{backgroundColor: window.ledColors[this.props.id]}} onClick={() => {
                    if(window.ledColors[this.props.id] == 'red') 
                        window.ledColors[this.props.id] = 'blue'
                    else if(window.ledColors[this.props.id] == 'blue') 
                        window.ledColors[this.props.id] = 'green'
                    else 
                        window.ledColors[this.props.id] = 'red'
                    changeColor(this.props.id, window.ledColors[this.props.id])
                    this.forceUpdate()
                }}/>
            </div>
        );
    }
}

export default Tube;
