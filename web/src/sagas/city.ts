import axios from 'axios';
import { GET_CITIES_FROM_API, setCities } from '../store/actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import { showNotiFormErrorResponse } from './notification';

export function getCitiesApi() {
  return axios.get(`/cities`);
}

export function* watchCitiesAction() {
  yield takeEvery(GET_CITIES_FROM_API, function*() {
    try {
      const { data } = yield call(getCitiesApi);
      yield put(setCities(data));
    } catch (e) {
      yield showNotiFormErrorResponse(e);
    }
  })
}