import React from 'react';
import './QuoteFrame.css';

// include the SVG responsible for the frame and the text 
// remember react uses camelCase properties such as `viewBox` (and not `viewbox`)
// furthermore, remember comments need wrapping {curly braces} ONLY inside HTML elements
const QuoteFrame = (props) => {
  return(
    /*
    in the wrapping SVG, include a viewbox equal to 1000+20 and 720+20
    this to later move the contents of the SVG in the frame and avoid cropping, while having nice round coordinates for the circle and path elements (1000*700)
    inspired by the way D3.js works with axes 
    */
  
    <svg viewBox="0 0 1020 720" className="QuoteFrame">
      {/*
      include a pattern which gives the impression of a texture, by including small circles side by side 
      reduce the opacity to avoid an excessive overlay
      */}     
      <defs>
        <pattern id="texture" x="0" y="0" width="5" height="3.5" patternUnits="userSpaceOnUse">
          <circle cx="2.8" cy="1.75" r="1.75" fill="#191919"stroke="none" opacity="0.3"/>
        </pattern>
      </defs>

      {/*
      with a group element
      - move the contents 10 to the right and 10 to the bottom, allowing the contents to work on a 1000*700 frame, while at the same time avoiding cropping at the edges
      - set stroke and fill properties shared by all SVG elements (stroke width is different for the circle elements and the frame, fill is actually altered for the path element as to include the texture)
      */} 
      <g transform="translate(10,10)" stroke="#b6b5b8" fill="none">
        {/*
        draw one circle for each corner 
        */} 
        <g strokeWidth="6">
          <circle cx="10" cy="10" r="10"/>
          <circle cx="990" cy="10" r="10"/>
          <circle cx="10" cy="690" r="10"/>
          <circle cx="990" cy="690" r="10"/>
        </g>
        {/*
        include a text element for the quote 
        stroke to give weight to the characters

        for the chosen frame and font-size (4.5rem), approximately 25 characters can stay on a single line
        in JS, when including a real quote dynamically, include tspan elements when this length is exceeded 
        tspan with a dy element pushing each successive tspan by 100, to avoid overlaps and distance the lines (4 lines seems to be an upper threshold, something which can be tested in JS)
        
        with text anchor set to middle, even if the text varies in length it gets still displayed centered in the frame
        */} 
        
        <g stroke="rgba(255,255,255,0.2)" stroke-width="3" fill="#fff">
          <text x="500" y="150" text-anchor="middle" className="text text__quote">
            <tspan x="500" dy="0">
              Life is really simple,
            </tspan>
            <tspan x="500" dy="100">
              but we insist of making 
            </tspan>
            <tspan x="500" dy="100">
              it complicated
            </tspan>
          </text>
          
          {/*
          include a text element for the author
          same text anchor chosen for the quote, to center the author right below it
          position it in the bottom section of the screen, but high enough to include the bottom decoration
          */} 
          
          <text text-anchor="middle" x="500" y="560" className="text text__author">{props.quote.author}</text>
        </g>
        
        {/*
        include the bottom decoration with simple path elements 
        stroke-linecap to avoid square linecaps, which might be too much
        */} 
        
        <path stroke-linecap="round" stroke-width="10" d="M 200 580 H 800"/>
        <path stroke-linecap="round" stroke-width="8" d="M 280 610 H 450 A 50 50 0 0 0 550 610 H 720"/>
        <circle stroke-width="8" cx="500" cy="620" r="10"/>

        {/*
        draw the frame with a path element, alternating straight lines and arcs for the inset corners 
        position the path after the other SVG elements to have the fill overlayed on said elements
        */} 
            
        <path fill="url(#texture)" stroke-width="8" d="M 50 0 H 950 A 50 50 0 0 0 1000 50 V 650 A 50 50 0 0 0 950 700 H 50 A 50 50 0 0 0 0 650 V 50 A 50 50 0 0 0 50 0 Z"/>
      </g>
    </svg>
  );
};

export default QuoteFrame;
