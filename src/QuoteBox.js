import React from 'react';
import './css/QuoteBox.css';
import QuoteBoxText from './QuoteBoxText';
import QuoteBoxActions from './QuoteBoxActions';

// in the quote QuoteBox, render a component responsible for the text and one responsible for the application's functionalities
const QuoteBox = (props) => {
  return(
    <div className="QuoteBox" id="quote-box">
      <QuoteBoxText color={props.color} counter={props.counter}/>
      <QuoteBoxActions color={props.color} counter={props.counter} handleButton={props.handleButton}/>
    </div>
  );
}

export default QuoteBox;