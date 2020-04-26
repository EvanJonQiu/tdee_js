import { BMR_CALCULATE, TDEE_CALCULATE } from "./actionTypes";

export const bmr_calculate = params => ({
  type: BMR_CALCULATE,
  payload: {...params}
});

export const tdee_calculate = params => ({
  type: TDEE_CALCULATE,
  payload: {...params}
});
