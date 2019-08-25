import React from 'react';
import Sequence from './sequence'
import Live from './live'
import Menu from './menu'
import { store } from './redux';
import { numOfTubes } from './globals'
import _ from 'lodash'
import 'particles.js';

const particlesJS = window.particlesJS;

const particleStyle = (options={}) => {return `
  position: ${options.position || 'fixed'};
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: -10000000;
  background-color: #0f5e9c;
`};

export default class App extends React.Component {
  constructor(props) {
    super(props)
    window.ledColors = _.map(Array(numOfTubes + 1), () => 'red')
    this.state = store.getState().routeManager
    store.subscribe(() => {
      this.setState(store.getState().routeManager)
    })
  }

  componentDidMount() {
    let tagElement = document.createElement("div");
    tagElement.setAttribute("id","particles-js");
    tagElement.setAttribute("style", particleStyle());
    window.tagElement = tagElement;
    document.body.appendChild(tagElement);
    particlesJS.load('particles-js', 'particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

  render() {
    return (
      <div className="app">
        <Menu />
        { this.state.route === 'Sequence' && <Sequence/> }
        { this.state.route === 'Live' && <Live />}
      </div>
      
    )
  }
}