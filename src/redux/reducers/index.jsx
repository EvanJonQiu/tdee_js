import {combineReducers} from "redux";
import bmr from "./bmr";
import tdee from "./tdee";
import other from "./other";

export default combineReducers({
  bmr,
  tdee,
  other
});