Link to the working pen right [here](https://codepen.io/borntofrappe/full/yqXOXG/).

**Update**

After some consideration regarding the progress achieved with the repository and the requirements of the test suite set up by @freeCodeCamp, I decided the following:

- the random quote machine is considered as a finished project. An effort experimental in nature, teaching in terms of React, SVG, and a simple API call. I will leave the notes on such project in the README, in a section labeled "# Previous Effort", as they document a really neat achievement.

- for the "Front End Libraries" certification, a new React-based project is created. Since I do not want to simply replicate my efforts with little to no modification, I plan to here include additional technologies and to create something slightly different.


# Preface

For the first of five projects leading up to the "Front End Libraries" certification, a random quote machine set to fulfill several user stories. As I already built such an application, [with](https://codepen.io/borntofrappe/full/PBmzGL/) and [without](https://codepen.io/borntofrappe/pen/VQYmpJ) an external library, I decide to complete the project for the certification with the following guidelines:

- I shall use React.js for the composition of the application and Redux.js to manage its state. I realize that Redux is likely to be an excessive tool given the simplicity of the app, but it is a good ooportunity to practice with a library I used only once;

- instead of a random quote machine, I shall build a random color machine. From a technical perspective there' very little to modify in light of this decision. The page will indeed visualize a "quote", with a hex color value and an "author", with the number of the random color selection. Basically, the visitor is given a hex color value matching the backround of the application. As he/she requests a new color, a counter variable is incremented. Whenever shared on Twitter, the string can be included to be something akin to "I really like this color #123456, my choice #3" (or a better copy of that).

Given these bullet points, an API request is not warranted. The store can simply dish out a random hex color and increment the counter variable every time an action gets dispatched.


## User Stories

This time around, the user stories are considered before-hand, to mold the idea around the requirements set by each point.

- [x] there exist a wrapper element with `id="quote-box"`;

- [x] in the wrapper, there exist an element with id="text" and an element with `id="author"`;

- [x] in the wrapper also, there exist a clickable element with `id="new-quote"` and another clickable element with `id="tweet-quote"`;

- [x] on first load, the application displays a random quote, with the elements of `#text` and `#author`

- [x] by clicking on `#new-quote`, the application should fetch a new quote in `#text`

- [x] by clicking on `#tweet-quote`, the application should allow a share on Twitter. This share is enacted by an `<a>`nchor link element with an `href` attribute including `"twitter.com/intent/tweet"`. 

- [x] `#quote-box` should be horizontally centered 

## React.js

Starting without the functionalities behind the application, to simply render the contents on the page, the following component-structure is included. Beware: the structure eerily replicates the one chosen for the previous, React & SVG effort. What changes is the actual contents of the component. Not SVG syntax, but bording ol' HTML markup. Semantic markup (I've been reading [HTML5 Cookbook](http://shop.oreilly.com/product/0636920016038.do), where I encountered this concept). 

```code
index.js
  App.js #quote-box
  Quote.js rendering #text & #author
  Buttons.js
    GetNewQuote.js rendering #new-quote
    ShareQuote.js rendering #tweet.quote
```

Hopefully the pseudo-code above is self-explanatory. I started to think about creating a `Button.js` component which is included twice for the tweet and new action, but decided to keep the two split since one requires a `<button>` and the other an `<a>`nchor link element.

**Updated Structure**

In the end the following components create the simple card-layout I had in mind:

```code
index
  App 
    QuoteBox  #quote-box 
      QuoteBoxText  rendering #text & #author

      QuoteBoxActions 
        GetNewQuote rendering #new-quote
        ShareQuote rendering #tweet.quote
```

Styling files are included for each file except for `GetNewQuote` and `ShareQuote`. Since these share most of their styling options, I decided to specify both of them in the parent container, `QuoteBoxActions`.

Since the CSS stylesheet might start to over-crowd the project's structure, it might be a good idea to separate them in a dedicated folder. Something which a larger project certainly needs to handle.

With the current project, static data is included through React's own state. The next step is the inclusion of Redux.

_Please note_

Apparently `create-react-app` doesn't allow references to a stylesheet occurring outside of the `src` folder. Something to know.

## Redux

First of all, be sure to include `redux` and `react-redux` in your project, either through `npm` or `yarn`. Once the `package.json` references these libraries, it is possible to import the components responsible for Redux's own functionalities. 

**index.js**

Instead of rendering a simple component, wrap `<App/>` in between a `<Provider>`, imported from the `react-redux` library.

This provider requires a `store`, which can be elsewhere defined and hereby imported. This is a JS file responsible for the state of the entire application (more on that later).

```JS
// import the provide, to wrap the parent component with the logic of the redux store
import { Provider } from 'react-redux';
// import the redux store
import store from './redux/store';

// render the only stateful component wrapped in the redux provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
```

**App.js**

In the stateful component, you can remove the `state` object in favour of Redux's own management. It is here important to bind, or _connect_ if you will, the state of the Redux's store to the context of the application. This feat is achieved through the `connect()` function, from the `react-redux` library.

This function is responsible to _map_ the state and the action creators (read: how redux manages and alters the state) to `props`. From here, the application has access to the state through the `props.` prefix.

Connect itself takes two arguments, normally labeled `mapStateToProps` and `mapDipatchToProps`, which are two functions describing the way the `state` is linked to `props`. It is then immediately called on the component on which this logic needs applying.

```JS
// include in the App component the state as tracked and managed by redux
App = connect(mapStateToProps, mapDispatchToProps)(App);
```

As far as these functions are concerned:

- they take as argument `state` and `dispatch` respectively;

- they return an object which describes the state and the action creators respectively.

_Please note_

In order to map the action creators you need to have them imported in the JS file.

For `mapStateToProps`:

```JS
// connect the component with the state and action creators defined through the store and redux in general
const mapStateToProps = (state) => {
  // when mapping the state, return the desired field, accessible through this.props.field in stateful components
  return {field: state.field}
};
```

For `mapDispatchToProps`:

```JS
const mapDispatchToProps = (dispatch) => {
  // when mapping the dispatching function, return the field directing toward the respective action creator and including the required arguments
  // these are accessible through this.props.fieldAction()
  return {
    fieldAction: (argument) => {
      dispatch(fieldActionCreator(argument))
    }
  }
};
```

Of course the `state`'s own field and the `dispatch`'s own action creators depend on the values included in the Redux store.

**actionTypes.js**

I like to separate the action types used by the store and defined by the action creators in a separate file. Much like Redux was for this application, this practice is perhaps excessive, but allows me to clearly divvy up some of the complexity behind the library itself.

```JS
// include the type(s) for the store and action creators
export const ACTION_TYPE = 'ACTION_TYPE';
```

Later in the importing files:

```JS
// import the action type(s)
import { ACTION_TYPE } from './actionTypes';
```

**actionCreators.js**

Action creators are functions which return actions. Actions are objects, with a mandatory `type` and optional, additional data, to be included in the store's logic.

The store handles these functions through the mentioned `type`.

```JS
export const actionCreator = (data) => {
  return {
    type: ACTION_TYPE
    data
  };
}
```

_Please note_

Through `data`, the object returns a field of `data` with a value of the argument passed in the function. If the two match in name, there's no need to assign the value, like so:

```JS
data: data
```

**store.js**

The store is responsible for 1) initialize the state, 1) create a reducer to handle actions and 1) create the store.

The first two steps are actually instrumental in the final responsibility, but one thing at a time. 

_createStore_

The store is created through the `createStore` function, passing as argument the reducer. The function itself is imported from `redux`.

```JS
const store = createStore(reducer);
```

_reducer_

The reducer is a function which accepts as argument the state of the application and a possible action. This action is the exact action possibly dispatched by the actionCreator(s) and the reducer defines here how to handle such a dispatch.

```JS
const reducer = (state = initialState, action) => {

};
```

In the block created by the function, the reducer can check for the `type` of the action and act accordingly (for instance, updating the state). 

```JS
const reducer = (state = initialState, action) => {
  if(action.type === ACTION_TYPE) {
    // do something 
    // return state
  }
  // REMEMBER to always return state
  // altered by the action or as-is, you always need to return state
  return state;
};
```

_initialState_

In the reducer, you can pass the state and initialize it to a default value. This is an object much alike the state object which gets defined in a React's stateful component. Nothing fancier.

**Wrapping-up**

Although Redux does include some complexity, it follows a certain logic, it its own way:

In Redux-land

- create a store
- define how the store introduces and manages the state
- define actions to modify the state in the manner described in the previous point

In React-land:

- include the store wrapping a component around the overarching object
- map the state and the actions to the `props` value of the component which need to access state and modify it respectively.

## Random Color

In the store, a function is defined to return a string for the color of the aplcation. The string's characters are randomly selected from a pool of 16 choices. 

```JS
function randomSix() {
  let color = "";
  for(let i = 0; i < 6; i++) {
    let randomSixteen = Math.floor(Math.random()*16);
    color += randomSixteen.toString(16);
  }
  return color;
}
```

This function can be included in the store to include a random color.

```JS
const initialState = {
  color: randomSix(),
  counter: 0
}
```

---
---


# Previous Effort

**Note of the previous effort**

As it turned out, checking the user stories for the @freeCodeCamp curriculum might have benefited me a lot... It seems that the current structure of the project is unfit to fulfill a few of them. Most of them actually.

As it is obvious by the previous update, I decided to keep the project as a nice experimental side-story, and keep the following notes as a teaching documentation.

Certainly nothing is lost. It has been an extremely valuable experience in practicing React, SVG, API calls, to produce something neat.

Link to the working pen right [here](https://codepen.io/borntofrappe/full/PBmzGL/).


## Preface

To earn the **Front End Libraries** certification for the @freeCodeCamp curriculum, I build with this project a _Random Quote Machine_, using the **React.js** library and **SVG** syntax for the overall design of the page.

I already built such an application before the freeCodeCamp curriculum was revisited with additional certifications and more strict testing. In that instance, I did not use any external library, but managed to create a rather [neat application](https://codepen.io/borntofrappe/pen/VQYmpJ).

To properly get a hold of the new certificate, I therefore decided to re-build the application, using the mentioned library. It is a nice pretext to practice with **React.js**, which is always a good thing, while pursuing one of my web development milestones. 

Given the library's inclusion, the project represents a new challenges in terms of application's development. In terms of design, I did not want to replicate the old style, so I also decided to create a new look. I felt a new application would deserve a new style, so to challenge myself also in terms of design.

With a [previous project](https://codepen.io/borntofrappe/pen/ejvdpj), I created a retro, old-timey-screen frame with SVG syntax which I think suits rather well a random quote machine. The text can be nicely framed and boldly displayed leveraging the different elements and attributes SVG has to offer. 

Since the design is already accounted for, and you can check the mentioned project [here on github](https://github.com/borntofrappe/Practice-Front-End-Web-Development/tree/master/SVG%20Frame%20and%20Texture), I therefore use the rest of this README to document my technical challenges and overall web development process.

## User Stories

<!-- Cue sad music -->

To complete the testing set up by @freeCodeCamp, the application needs to fulfill several user stories.

Since most bullet points do seem like minor tweaks around a central challenge, literally building a random quote machine, I decided to develop the application first and fulfill the user stories later. Literally checking any requirement.

## Development 

The web development environment is set up locally through the `create-react-app` utility. On _CodePen_, the project uses instead the libraries for `react`, `react-dom`, `react-transition-group` as included in the settings panel. Just remember to add **Babel** to have the syntax properly render on the page.

### React.js

The project is divided in the following component-based structure:

```code
index.js
  App.js
    QuoteFrame

    QuoteControls
      ShareQuote
      GetNewQUote
```

- `index.js` is used to render the stateful component responsible for the application.

- `App.js` is used to set the state, manage any changes to the same and structure the project. It renders the different components responsible for the application's visuals and funcitonalities. In terms of functionalities, it is also responsible for calls to the API used to retrieve quotes (in `componentDidMount()`).

- `QuoteFrame.js` is used to display the quote, in terms of text and author. Both pieces of text are included through SVG elements and are framed together in an SVG element as well. The component solely renders the mentioned SVG elements, with the information passed from the state.

- `QuoteControls.js` is used to include the buttons responsible for 1) retrieve a new quote and 1) share the quote on Twitter. They are gathered here together in sort of a controls' panel (which may be styled additionally in the future).

- `ShareQuote.js` is responsible for the rendering of the button used to share the existing quote on Twitter.

- `GetNewQuote.js` is instead tasked to include a new call to the quote API, and for the rendering of said quote in the frame. 

### Layout

The layout of the frame is already decided through the [previous and documented effort](https://github.com/borntofrappe/Practice-Front-End-Web-Development/tree/master/SVG%20Frame%20and%20Texture). The current project also includes a new layout element (the controls' panel), which needs to be positioned as to be clearly visible.

For screens smaller than 800px, the viewport allows for space below (or above if needed) the SVG frame. This space is created by the simple fact that the frame itself is sized relative to the width and its height is tightly coupled with this measure. For such viewports, the controls' panel can be readily positioned right below (or above if needed) the frame.

For viewports larger than 800px, the frame occupies a large portion of the viewport's height and the same choice may lead to the controls button being hidden below the fold. To account for such a circumstance, it might be better to position the buttons on the right side (or the left side) of the frame. The fact that the frame is fixed to be 800px guarantees that there is indeed space around it. (the media query might be created for screen sizes greater than 1000px).

### SVG Text

Since the SVG allows for only so many characters before it crops the text out, it is necessary to proof the input string. With some experimenting and with the prescribed width and font-size, each line in the frame can hold at most 25 characters. 

My approach to accommodate for such a circumstance is take the input string, convert it into an array of strings, which are at most 25 characters (or so) and then loop through this array, adding a <tspan> element for each array item.

The following is the detailed approach which solved my issue:

1. initialize a test string.

  ```JS
  let testString = "This is a string with only one responsibility. That literally being more than twenty and five characters long. I'd say this is pretty much above that threshold";
  ```

1. split the string into an array in which the array items are single words.

  ```JS
  let arrWords = testString.split(" "); // array of words
  ```

1. initialize variables to keep track of the length of the string made up the words in the array and push said string to an array storing the desired element.

  ```JS
  let tempString = ""; // string to store the multiple words
  let arrStrings = []; // array in which to store strings up to a certain height 
  ```

1. lopp through the array of words.

  ```JS
  for(let i = 0; i < arrWords.length; i++) {

  }
  ```

1. append the words to the temporary string, followed by a whitespace to separate each one of them.

  ```JS
  for(let i = 0; i < arrWords.length; i++) {
    tempString += arrWords[i] + " ";
  }
  ```

1. test the length of the string. If this exceeds a threshold (let's say 18 characters), push the temporary string to the array of results and re-initialize it to an empty string .

  ```JS
  for(let i = 0; i < arrWords.length; i++) {
    tempString += arrWords[i] + " ";
    if(tempString.length >= 18) {
      arrStrings.push(tempString);
      tempString = "";
    }
  }
  ```

1. as the last array items may not be accounted, remember to include the last tempString even if said string is less than 18 characters long.

  ```JS
  for(let i = 0; i < arrWords.length; i++) {
    tempString += arrWords[i] + " ";
    if(tempString.length >= 18) {
      arrStrings.push(tempString);
      tempString = "";
    }
    if(i == arrWords.length - 1) {
      arrStrings.push(tempString);
      tempString = "";
    }
  }
```

**Testing**

What is left is _testing_ the code, which all together comes as follows:

```JS
let testString = "This is a string with only one responsibility. That literally being more than twenty and five characters long. I'd say this is pretty much above that threshold";

let arrWords = testString.split(" "); // array of words

let tempString = ""; // string to store the multiple words
let arrStrings = []; // array in which to store strings up to a certain height 

for(let i = 0; i < arrWords.length; i++) {
  tempString += arrWords[i] + " ";
  if(tempString.length >= 18) {
    arrStrings.push(tempString);
    tempString = "";
  }
  if(i == arrWords.length - 1) {
    arrStrings.push(tempString);
    tempString = "";
  }
}

console.log(arrStrings); // ?!
```

**Result**

```JS
[
  "This is a string with ", "only one responsibility. ", "That literally being ", "more than twenty and ", "five characters long. ", "I'd say this is pretty ", "much above that threshold ", ""
]
```

Seems to be working, but with a few annoyances:

- the white space at the end of each array item;

- the empty item at the end of the array.

The first issue is easily dealt with, by pushing the string up to its penultimate character:

```JS
arrStrings.push(tempString.substring(0, tempString.length-1));
```

The second issue is made evident when I remove the last word in the array... and realize the string is actually made of the exact number which does not need a catch-all condition.

Adding the last word, the array gets the last string and this statement adds an empty array.

```JS
if(i == arrWords.length - 1) {
  arrStrings.push(tempString);
  tempString = "";
}
```

A simple check can be included to prevent such a situation from occurring: 

```JS
if(i == arrWords.length - 1 && tempString != "") {
  arrStrings.push(tempString);
  tempString = "";
}
```

**Wrap-up**

```JS
let testString = "This is a string with only one responsibility. That literally being more than twenty and five characters long. I'd say this is pretty much above that";

let arrWords = testString.split(" "); // array of words

let tempString = ""; // string to store the multiple words
let arrStrings = []; // array in which to store strings up to a certain height

for(let i = 0; i < arrWords.length; i++) {
  tempString += arrWords[i] + " ";
  if(tempString.length >= 18) {
    arrStrings.push(tempString.substring(0, tempString.length-1));
    tempString = "";
  }
  if(i == arrWords.length - 1 && tempString != "") {
    arrStrings.push(tempString.substring(0, tempString.length-1));
    tempString = "";
  }
}

console.log(arrStrings); // fingers crossed
```

**Result**

```JS
["This is a string with", "only one responsibility.", "That literally being", "more than twenty and", "five characters long.", "I'd say this is pretty", "much above that"]
```

Yay! It works.