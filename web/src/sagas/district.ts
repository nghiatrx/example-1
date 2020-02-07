import axios from 'axios';
import { GET_DISTRICTS_FROM_API, setDistricts } from '../store/actions';
import { takeEvery, put, call } from 'redux-saga/effects';

export function getDistrictsApi() {
  return axios.get(`/districts`);
}

export function* watchDistrictsAction() {
  yield takeEvery(GET_DISTRICTS_FROM_API, function*() {
    const { data } = yield call(getDistrictsApi);
    yield put(setDistricts(data));
  })
}