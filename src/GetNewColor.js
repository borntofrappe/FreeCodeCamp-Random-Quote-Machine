import React from 'react';
// important: the style of the component is included in the stylesheet of the parent component, for convenience
// import './css/GetNewColor.css';

// render the GetNewColor button as a button nesting the SVG icon of a plus sign
// include teh handle button function to udpate the store and re-render the page
const GetNewColor = (props) => {
  return(
    <button id="new-quote" className="GetNewColor" onClick={props.handleButton}>
      <svg width="100" height="80" viewBox="0 0 26.458317 21.166666"><g transform="translate(18.655 2.388)"><rect ry=".232" rx=".397" y="-.404" x="-8.072" height="18.521" width="3.969"/><rect width="5.292" height="19.844" x="-8.072" y="-1.727" rx=".529" ry=".248"/><rect transform="rotate(90)" ry=".248" rx=".529" y="-4.496" x="5.55" height="19.844" width="5.292"/></g></svg>
    </button>
  );
}

export default GetNewColor;