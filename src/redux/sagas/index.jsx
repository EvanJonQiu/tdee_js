import { call } from 'redux-saga/effects';

function foo() {

}

export default function* rootSaga() {
  yield call(foo);
}