import axios from 'axios';
import { GET_DISTRICTS_FROM_API, setDistricts } from '../store/actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import IAction from '../store/action.interface';
import { showNotiFormErrorResponse } from './notification';

export function getDistrictsApi(cityId: string) {
  return axios.get(`/districts?cityId=${cityId}`);
}

export function* watchDistrictsAction() {
  yield takeEvery(GET_DISTRICTS_FROM_API, function*(data: IAction) {
    try {
      const result = yield call(getDistrictsApi, data.payload.cityId);
      yield put(setDistricts(data.payload.cityId, result.data));
    } catch (e) {
      yield showNotiFormErrorResponse(e);
    }
  })
}