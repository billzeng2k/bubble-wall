import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tube from './components/tube'
import { connect } from 'react-redux';
import { changeBubbleCount, increaseBubbleCount, decreaseBubbleCount } from './redux';
import BubbleContainer from './components/bubbleContainer';

const numOfTubes = 10
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    this.tubes = []
    this.bubbleContainer = []
    for(var i = 0; i < numOfTubes; i++) {
      this.tubes.push(<Tube/>)
      this.bubbleContainer.push(<BubbleContainer/>)
    }
  }

  render() {
    return (
      <div className="app">
        <div className="tubes">
          {this.tubes}
        </div>
        <div className="tubes">
          {this.bubbleContainer}
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
  decreaseBubbleCount
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
