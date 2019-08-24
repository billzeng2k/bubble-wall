import React from 'react';
import './App.css';
import Tube from './components/tube'
import { connect } from 'react-redux';
import { numOfTubes, openValve, closeValve } from './globals'
import { changeBubbleCount, increaseBubbleCount, decreaseBubbleCount, pressKey, releaseKey, bubblesPlaying, changeRoute } from './redux';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { store } from './redux';
import _ from 'lodash'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState().bubbleManager
        store.subscribe(() => {
            this.setState(store.getState().bubbleManager)
        })
        const firstNote = MidiNumbers.fromNote('c3');
        const lastNote = MidiNumbers.fromNote('f5');
        console.log(KeyboardShortcuts.HOME_ROW)
        const keyboardShortcuts = KeyboardShortcuts.create({
            firstNote: firstNote,
            lastNote: lastNote,
            keyboardConfig: ['1', '2', '3', '4', '5']
        });
    }
    
    componentWillMount() {
        this.tubes = []
        this.bubbleContainer = []
        this.bubbles = []
        for(var i = 0; i < numOfTubes; i++) {
            this.tubes.push(<Tube key={"tube" + i} label={(i + 1) % 10} activateCallback={(open, valve) => {
                if(open) 
                    openValve(valve)
                else
                    closeValve(valve)
            }}/>)
        }
    }

    render() {
        return (
        <div className="app">
            <button onClick={() => this.props.changeRoute('Sequence')}>Sequence</button>
            <div className="bubble-wall"> 
                <div className="tubes">
                    {this.tubes}
                </div>
            </div>
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
    bubblesPlaying,
    changeRoute
};

const AppContainer = connect(
    null,
    mapDispatchToProps
)(App);

export default AppContainer;
