import React from 'react';
import './App.css';
import Tube from './components/tube'
import { connect } from 'react-redux';
import { numOfTubes, openValve, closeValve } from './globals'
import { changeBubbleCount, increaseBubbleCount, decreaseBubbleCount, pressKey, releaseKey, bubblesPlaying, changeRoute } from './redux';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import SoundfontProvider from "./components/soundFontProvider.js";
import 'react-piano/dist/styles.css';
import { store } from './redux';
import _ from 'lodash'

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f4'),
};

const keyboardShortcuts = [{ key: '1', midiNumber: 53, note: 'F' }, { key: '2', midiNumber: 55, note: 'G' }, { key: '3', midiNumber: 57, note: 'A' }, { key: '4', midiNumber: 59, note: 'B' }, { key: '5', midiNumber: 60, note: 'C' }, { key: '6', midiNumber: 62, note: 'D' }, { key: '7', midiNumber: 64, note: 'E' }, { key: '8', midiNumber: 65, note: 'F' }, { key: '9', midiNumber: 67, note: 'G' }]
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
            this.tubes.push(<Tube key={"tube" + i} label={(i + 1) % 10} note={keyboardShortcuts[i].note} activateCallback={(open, valve) => {
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
            <BasicPiano />
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

function BasicPiano() {
    return (
        <div style={{width: 0, height: 0, opacity: 0, pointerEvents: 'none'}}>
            <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                    <Piano
                        noteRange={noteRange}
                        width={300}
                        playNote={playNote}
                        stopNote={stopNote}
                        disabled={isLoading}
                        keyboardShortcuts={keyboardShortcuts}
                    />
                )}
            />
        </div>
    );
}

export default AppContainer;
