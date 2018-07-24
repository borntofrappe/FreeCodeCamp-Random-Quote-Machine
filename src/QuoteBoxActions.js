import React from 'react';
import './css/QuoteBoxActions.css';
import ShareQuote from './ShareQuote';
import GetNewQuote from './GetNewQuote';

// in the QuoteBoxActions component render a button responsible for the getNewQuote action and an anchor link responsible for the shareQuote action
const QuoteBoxActions = (props) => {
  return(
    <div className="QuoteBoxActions">
      <ShareQuote />
      <GetNewQuote />
    </div>
  );
}

export default QuoteBoxActions;