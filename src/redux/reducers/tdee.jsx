import { TDEE_CALCULATE } from "../actionTypes";

const initialState = {
  exerciseRate: 1.2,
  tdee: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TDEE_CALCULATE: {
      return {
        ...action.payload
      };
    }
    default:
      return state;
  }
}
