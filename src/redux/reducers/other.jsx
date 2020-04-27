import { OTHER_LOAD_DATA } from "../actionTypes";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OTHER_LOAD_DATA: {
      return {
        ...action.payload
      };
    }
    default:
      return state;
  }
}