// import the action types
import { NEW_COLOR } from './actionTypes';

// define the action creator(s), returning an action with the desired type
export const newColorAction = () => {
  return {
    type: NEW_COLOR
  };
};