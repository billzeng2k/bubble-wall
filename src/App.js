import React from 'react';
import Sequence from './sequence'
import Live from './live'
import { store } from './redux';

export default class App extends React.Component {
  constructor(props) {
    super(props)
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