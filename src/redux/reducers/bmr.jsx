import { BMR_CALCULATE } from "../actionTypes";

const initialState = {
  age: 0,
  height: 0,
  weight: 0,
  gender: "男",
  bmr: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BMR_CALCULATE: {
      return {
        ...action.payload
      };
    }
    default:
      return state;
  }
}