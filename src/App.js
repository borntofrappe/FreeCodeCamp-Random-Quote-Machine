import React, { Component } from 'react';
import './css/App.css';
import QuoteBox from './QuoteBox';

// render the quote box nesting the contents of the application
class App extends Component {
  // initially include the quote through React's state
  constructor(props) {
    super(props);
    this.state = {
      quote: {
        color: "9A9AFF",
        number: 0
      }
    }
  }
  render() {
    return (
      <div className="App">
        <QuoteBox color={this.state.quote.color} number={this.state.quote.number}/>
      </div>
    );
  }
}

export default App;
