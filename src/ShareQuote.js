import React from 'react';
// important: the style of the component is included in the stylesheet of the parent component, for convenience
// import './css/ShareQuote.css';

// render the ShareQuote button as an anchor link elements nesting the SVG icon of a certain bird
// anchor link elements which includes in the href attribute the URL required to tweet a sentence related to the page's contents
const ShareQuote = (props) => {
  let tweet = `I kinda like this color %23${props.color}. And it was only my choice %23${props.counter}`;
  let href = `https://twitter.com/intent/tweet?hashtags=beingpicky&text=${tweet}`;
  return(
    <a href={href} target="_blank" id="tweet-quote" className="ShareQuote">
      <svg width="100" height="80" viewBox="0 0 26.458317 21.166666"><path d="M12.333 20.932s11.139-1.659 11.338-14.83c0 0 2.884-.817 2.785-1.43l-2.984-.102s2.785-1.226 2.685-2.349c0 0-3.083 1.532-3.68.715-.356-.686-7.763-6.01-9.846 3.6 0 0-8.553-1.43-10.642-6.536 0 0-.398 9.088 3.78 8.986 0 0-3.084.306-5.769-2.349 0 0 .696 4.8 6.962 5.616 0 0-4.078 1.736-4.475.613 0 0 2.685 3.268 6.564 2.349 0 0-4.575 4.799-8.454 4.084 0 0 5.868 2.655 11.736 1.634z"/></svg>
    </a>
  );
}

export default ShareQuote;