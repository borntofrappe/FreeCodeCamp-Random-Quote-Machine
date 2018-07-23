To earn the **Front End Libraries** certification for the @freeCodeCamp curriculum, I build with this project a _Random Quote Machine_, using the **React.js** library and **SVG** syntax for the overall design of the page.

## Preface

I already built such an application before the freeCodeCamp curriculum was revisited with additional certifications and more strict testing. In that instance, I did not use any external library, but managed to create a rather [neat application](https://codepen.io/borntofrappe/pen/VQYmpJ).

To properly get a hold of the new certificate, I therefore decided to re-build the application, using the mentioned library. It is a nice pretext to practice with **React.js**, which is always a good thing, while pursuing one of my web development milestones. 

Given the library's inclusion, the project represents a new challenges in terms of application's development. In terms of design, I did not want to replicate the old style, so I also decided to create a new look. I felt a new application would deserve a new style, so to challenge myself also in terms of design.

With a [previous project](https://codepen.io/borntofrappe/pen/ejvdpj), I created a retro, old-timey-screen frame with SVG syntax which I think suits rather well a random quote machine. The text can be nicely framed and boldly displayed leveraging the different elements and attributes SVG has to offer. 

Since the design is already accounted for, and you can check the mentioned project [here on github](https://github.com/borntofrappe/Practice-Front-End-Web-Development/tree/master/SVG%20Frame%20and%20Texture), I therefore use the rest of this README to document my technical challenges and overall web development process.

## User Stories

To complete the testing set up by @freeCodeCamp, the application needs to fulfill several user stories:

- [ ] there exist a wrapper element with `id="quote-box"`;

- [ ] in the wrapper, there exist an element with id="text" and an element with `id="author"`;

- [ ] in the wrapper also, there exist a clickable element with `id="new-quote"` and another clickable element with `id="tweet-quote"`;

- [ ] on first load, the application displays a random quote, with the elements of `#text` and `#author`

- [ ] by clicking on `#new-quote`, the application should detch a new quote in `#text`

- [ ] by clicking on `#tweet-quote`, the application should allow a share on Twitter. This share is enacted by an `<a>`nchor link element with an `href` attribute including `"twitter.com/intent/tweet"`. 

- [ ] `#quote-box` should be horizontally centered 

Since most bullet points do seem like minor tweaks around a central challenge, literally building a random quote machine, I decided to develop the application first and fulfill the user stories later. Literally checking any requirement.

## Development 

The web development environment is set up locally through the `create-react-app` utility. On _CodePen_, the project uses instead the libraries for `react`, `react-dom`, `react-transition-group` as included in the settings panel. Just remember to add **Babel** to have the syntax properly render on the page.




