import React, { Component } from 'react';
import './App.css';
// import the two components responsible for the application
import QuoteFrame from './QuoteFrame';
import QuoteControls from './QuoteControls';

/*
in the single stateful component, include two components, to render 
1. a frame in which to display a quote, text and author 
1. a container for 'controls', with buttons to get a new quote & sharing the quote on twitter respectively
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {
        text: 'Life is really simple, but we insist of making it complicated',
        author: 'Confucius'
      }
    }
  }

  /*
  // in componentDidMount retrieve data from the API and trigger a re-rendering of the component
  componentDidMount() {
      // create a variable for the URL and variables in which to include data from the API call
      const URL = "https://api.pokemontcg.io/v1/cards?setCode=base1";
      let cards = [];

      // create a request for the prescribed URL
      let request = new Request(URL);

      // fetch the return value from the request
      // return value: the data
      fetch(request)
        // format the data to work with a JSON object
        // argument: data
        // return value: json object
        .then((response) => {
          return response.json();
        })
        // retrieve from the JSON object the information required for the project; for now solely the URL of the images found in the cards array
        // argument: json object
        // logic: loop through the cards array and push each imageURL property in the variable created for the data 
        .then((json) => {
          cards = [...json.cards];

        })
        // update the state of the application with the retrieved data
        // this point is better discussed in the following section
        .then(() => {
        this.setState({
          cards: cards
        });
      });    
  }
  */
  
  render() {
    return (
      <div className="App">
        <QuoteFrame quote={this.state.quote}/>
      </div>
    );
  }
}

export default App;
