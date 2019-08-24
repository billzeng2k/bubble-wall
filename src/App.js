import React from 'react';
import './App.css';
import Tube from './components/tube'
import { connect } from 'react-redux';
import { changeBubbleCount, increaseBubbleCount, decreaseBubbleCount, pressKey, releaseKey } from './redux';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import BubbleContainer from './components/bubbleContainer';
import _ from 'lodash'

const numOfTubes = 10
class App extends React.Component {
  constructor(props) {
    super(props)
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

  playSequence() {
    let commands = this.getAllCommands()
    let command = _.map(commands, (c) => c.next())
    let finished = 0
    const startTime = new Date().getTime()
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
          if(command[i].done)
            finished++
        }
      }
      if(finished == numOfTubes) 
        clearInterval(this.loop)
    }, 100)
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
        <button onClick={() => this.playSequence()}>Hello</button>
        <div className="bubble-wall"> 
          <div className="tubes">
            {this.tubes}
          </div>
          <div className="tubes">
            {this.bubbleContainer}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bubbleCount: state.bubbleCount,
});

const mapDispatchToProps = {
  changeBubbleCount,
  increaseBubbleCount,
  decreaseBubbleCount,
  pressKey,
  releaseKey
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
