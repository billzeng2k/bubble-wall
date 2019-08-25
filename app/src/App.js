import React from 'react';
import Sequence from './sequence'
import Live from './live'
import { store } from './redux';
import { numOfTubes } from './globals'
import _ from 'lodash'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    window.ledColors = _.map(Array(numOfTubes + 1), () => 'red')
    this.state = store.getState().routeManager
    store.subscribe(() => {
      this.setState(store.getState().routeManager)
    })
  }

  render() {
    if(this.state.route === 'Sequence')
      return <Sequence/>
    else
      return <Live/>
  }
}