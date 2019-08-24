import React from 'react';
import './App.css';
import Tube from './components/tube'
import { connect } from 'react-redux';
import { step, numOfTubes } from './globals'
import { changeBubbleCount, increaseBubbleCount, decreaseBubbleCount, pressKey, releaseKey, bubblesPlaying } from './redux';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import BubbleContainer from './components/bubbleContainer';
import { store } from './redux';
import _ from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState().bubbleManager
    store.subscribe(() => {
      this.setState(store.getState().bubbleManager)
    })
  }
  
  componentWillMount() {
    this.tubes = []
    this.bubbleContainer = []
    this.bubbles = []
    for(var i = 0; i < numOfTubes; i++) {
      this.tubes.push(<Tube key={"tube" + i}/>)
      this.bubbleContainer.push(<BubbleContainer key={"bubbleContainer" + i} ref={ref => this.bubbles.push(ref)} label={i == 0}/>)
    }
  }

  getAllCommands() { 
    return _.map(this.bubbles, (bubble) => bubble.tubeToCommand()[Symbol.iterator]())
  }

  openValve(valueNumber, st) {
    console.log('OPENING VALVE ' + valueNumber + ' AT ' + (new Date().getTime() - st))
  }

  closeValve(valveNumber, st) {
    console.log('CLOSING VALVE ' + valveNumber + ' AT ' + (new Date().getTime() - st))
  }

  async playSequence() {
    let commands = this.getAllCommands()
    let command = _.map(commands, (c) => c.next())
    await this.setState({bubbleContainerStyle: {transform: 'translateY(100%)'}})
    setTimeout(() => {
      const startTime = new Date().getTime()
      this.props.bubblesPlaying(true)
      console.log(this.bubbleContainerRef.scrollHeight, this.bubbleContainerRef.clientHeight)
      this.setState({bubbleContainerStyle: {transform: 'translateY(' + (this.bubbleContainerRef.clientHeight - this.bubbleContainerRef.scrollHeight) + 'px)', transition: 'transform ' + (step * this.state.bubbleCount / 1000) + 's linear', overflowY: 'visible'}})
      // await this.setState({bubbleContainerStyle: {transform: 'translateY(0)', transition: 'transform ' + (step * this.state.bubbleCount) + 's'}})
      this.loop = setInterval(() => {
        let currentTime = new Date().getTime()
        for(let i = 0; i < command.length; i++) {
          let c = command[i]
          if(c.done)
            continue
          if(c.value.time <= currentTime - startTime) {
            if(c.value.open)
              this.openValve(i, startTime)
            else 
              this.closeValve(i, startTime)
            command[i] = commands[i].next()
          }
        }
        if(currentTime - startTime >= step * this.state.bubbleCount) {
          clearInterval(this.loop)
          setTimeout(() => {
            this.props.bubblesPlaying(false)
          this.setState({bubbleContainerStyle: {overflowY: 'scroll'}})
          }, 2000)     
        } 
      }, 100)
    }, 1000)
  }

  render() {
    return (
      <div className="app">
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue='Shift'
          onKeyHandle={(e) => this.props.pressKey(e.keyCode)}
        />
        <KeyHandler
          keyEventName={KEYUP}
          keyValue='Shift'
          onKeyHandle={(e) => this.props.releaseKey(e.keyCode)}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue='Alt'
          onKeyHandle={(e) => this.props.pressKey(e.keyCode)}
        />
        <KeyHandler
          keyEventName={KEYUP}
          keyValue='Alt'
          onKeyHandle={(e) => this.props.releaseKey(e.keyCode)}
        />
        <KeyHandler
          keyEventName={KEYUP}
          keyValue='='
          onKeyHandle={(e) => this.props.increaseBubbleCount()}
        />
        <KeyHandler
          keyEventName={KEYUP}
          keyValue='-'
          onKeyHandle={(e) => this.props.decreaseBubbleCount()}
        />
        <div className="bubble-wall"> 
          <div className="tubes">
            {this.tubes}
          </div>
          <div className="tubes" style={this.state.bubbleContainerStyle} ref={ref=>this.bubbleContainerRef=ref}>
            {this.bubbleContainer}
          </div>
        </div>
        <button onClick={() => this.playSequence()}>Play Sequence</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  changeBubbleCount,
  increaseBubbleCount,
  decreaseBubbleCount,
  pressKey,
  releaseKey,
  bubblesPlaying
};

const AppContainer = connect(
  null,
  mapDispatchToProps
)(App);

export default AppContainer;
