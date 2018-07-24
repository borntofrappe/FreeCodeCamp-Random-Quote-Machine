// import create store to create the store, literally
import { createStore } from 'redux';
// import the action type(s) 
import { NEW_COLOR } from './actionTypes';

// define a function which returns a string of six characters, six hex characters to be specific (0-f range)
function randomSix() {
  let color = "";
  for(let i = 0; i < 6; i++) {
    let randomSixteen = Math.floor(Math.random()*16);
    color += randomSixteen.toString(16);
  }
  return color;
}

// set initial state to an object with a color defined by the randomSix variable and a counter initialized to 0
const initialState = {
  color: randomSix(),
  counter: 0
}

// create a reducers which handles the store's action(s)
const colorReducer = (state = initialState, action) => {
  if(action.type === NEW_COLOR) {
    // return a new set of hex characters and incrent the counter variable
    return {
        color: randomSix(),
        counter: state.counter + 1
    };
  }
  return state;
}

// create the store passing the single reducer
const store = createStore(colorReducer);

export default store;