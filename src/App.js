import React, { Component } from 'react';
import './css/App.css';
import QuoteBox from './QuoteBox';

// import connect to include the action creator(s) in the component
import { connect } from 'react-redux';
// import the action creators
import { newColorAction } from './redux/actionCreators'
// connect and the action creators are included after the component is instantiated

// render the quote box nesting the contents of the application
class App extends Component {
  constructor(props) {
    super(props);
    // bind the handle button function, which triggers a re-render of the page
    this.handleButton = this.handleButton.bind(this);
  }

  // when the component is first included, immediately call the function to fetch a random color 
  componentDidMount() {
    this.handleButton();
  }

  // define the function which fetches the random color, by dispatching the action creator
  handleButton() {
    this.props.newColor();
    // update the CSS variable to have the theme color match the new color
    const root = document.querySelector(":root");
    root.style.setProperty("--color-theme", `#${this.props.color}`);
  }
  render() {
    // render a single component to include the text and the button/anchor link elements for the app's functionalities 
    return (
      <div className="App">
        <QuoteBox color={this.props.color} counter={this.props.counter} handleButton={this.handleButton}/>
      </div>
    );
  }
}

// connect the component with the state and action creators defined through the store and redux in general
const mapStateToProps = (state) => {
  // the state becomes accessible as this.props.color and this.props.counter respectively
  return {
    color: state.color,
    counter: state.counter
  }
};
const mapDispatchToProps = (dispatch) => {
  // the action creator is accessible as this.props.newColor()
  return {
    newColor: () => {
      dispatch(newColorAction());
    }
  }
};

// connect the application with the functions mapping the state and action creators
App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
