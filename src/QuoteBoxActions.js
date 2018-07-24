import React from 'react';
import './css/QuoteBoxActions.css';
import ShareQuote from './ShareQuote';
import GetNewColor from './GetNewColor';

// in the QuoteBoxActions component render a button responsible for the GetNewColor action and an anchor link responsible for the shareQuote action
const QuoteBoxActions = (props) => {
  return(
    <div className="QuoteBoxActions">
      <ShareQuote color={props.color} counter={props.counter}/>
      <GetNewColor handleButton={props.handleButton}/>
    </div>
  );
}

export default QuoteBoxActions;