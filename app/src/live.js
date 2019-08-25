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
                    openValve(valve, this.state.characteristic)
                else
                    closeValve(valve, this.state.characteristic)
            }}/>)
        }
    }
    async connect() {
        //31383DC4-525B-2052-838F-7FADD63D25FD
        try {
            let device = await navigator.bluetooth.requestDevice({ filters: [{
                name: 'BUBBLE'
            }], optionalServices: [0xFFE0] })
            let server = await device.gatt.connect()
            let service = await server.getPrimaryService(0xFFE0)
            let characteristic = await service.getCharacteristic(0xFFE1);
            this.setState({
                characteristic
            })
        }
        catch (error) {
            console.log("Something went wrong. " + error);
        };
    }

    render() {
        return (
        <div className="app">
            <button onClick={() => this.props.changeRoute('Sequence')}>Sequence</button>
            {!this.state.characteristic && <button onClick={() => this.connect()}>Connect</button>}
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
