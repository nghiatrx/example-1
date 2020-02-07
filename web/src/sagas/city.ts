import axios from 'axios';
import { GET_CITIES_FROM_API, setCities } from '../store/actions';
import { takeEvery, put, call } from 'redux-saga/effects';

export function getCitiesApi() {
  return axios.get(`/cities`);
}

export function* watchCitiesAction() {
  yield takeEvery(GET_CITIES_FROM_API, function*() {
    const { data } = yield call(getCitiesApi);
    yield put(setCities(data));
  })
}