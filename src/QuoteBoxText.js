import React from 'react';
import './css/QuoteBoxText.css';

// in the QuoteBoxTextText component render header elements with the values retrieved from the Redux store
const QuoteBoxText = (props) => {
  return(
    <div className="QuoteBoxText">
      <h1 id="text">{props.color}</h1>
      <h2 id="author">Choice #{props.counter}</h2>
    </div>
  );
}

export default QuoteBoxText;