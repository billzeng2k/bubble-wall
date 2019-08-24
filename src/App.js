import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tube from './components/tube'
import { connect } from 'react-redux';
import { changeBubbleCount, increaseBubbleCount, decreaseBubbleCount } from './redux';

const numOfTubes = 10
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    this.tubes = []
    for(var i = 0; i < numOfTubes; i++)
      this.tubes.push(<Tube/>)
  }

  render() {
    return (
      <div className="container">
        <button onClick={() => this.props.decreaseBubbleCount()}> Click Me </button>
        {this.tubes}
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
