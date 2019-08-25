import React from 'react';
import logo from './logo.png'

import { changeBubbleCount, increaseBubbleCount, decreaseBubbleCount, pressKey, releaseKey, bubblesPlaying, changeRoute } from './redux';
import { connect } from 'react-redux';
import { store } from './redux';


class Menu extends React.Component {
    constructor(props) {
        super();
        this.state = store.getState().routeManager
        store.subscribe(() => {
            this.setState(store.getState().routeManager)
        })
    }

    async connect() {
        //31383DC4-525B-2052-838F-7FADD63D25FD
        try {
            let device = await navigator.bluetooth.requestDevice({ filters: [{
                name: 'BUBBLE'
            }], optionalServices: [0xFFE0] })
            let server = await device.gatt.connect()
            let service = await server.getPrimaryService(0xFFE0)
            window.characteristic = await service.getCharacteristic(0xFFE1);
            this.setState({connected: true})
        }
        catch (error) {
            console.log("Something went wrong. " + error);
        };
    }

    render() {
        return (
            <div className="menu">
                <img className="logo" src={logo} />
                <h1 style={{color:'#74ccf4'}}>
                    Control a bubble wall through a fun interface!
                </h1>
                {!window.characteristic && <button onClick={() => this.connect()}>Connect</button>}
                <div className="buttons">
                    <button onClick={() => this.props.changeRoute('Live')}>Live</button>
                    <button onClick={() => this.props.changeRoute('Sequence')}>Sequence</button>
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
)(Menu);

export default AppContainer;