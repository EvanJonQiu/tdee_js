import { takeEvery, all, put, call } from "redux-saga/effects";
import { fetchData } from "../../utils/fetcWrapper";

async function getData() {
  let data = [];
  try {
    data = await fetchData("https://restcountries.eu/rest/v1/all");
  } catch (e) {
    console.log(e);
    throw e;
  }
  return data;
}

function* loadDataEffect() {
  let data = yield call(getData);
  yield put({
    type: "OTHER_LOAD_DATA",
    payload: {
      data: data.data
    }
  });
}

export default function* rootSaga() {
  yield all([takeEvery("OTHER_LOAD_DATA_EFFECT", loadDataEffect)]);
}
