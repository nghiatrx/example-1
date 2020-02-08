
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import { GET_STORE_FROM_API, setStore, SAVE_STORE } from '../store/actions';
import { Store } from '../store/storeinfo/storeinfo.interface';
import IAction from '../store/action.interface';
import { showNotiFormErrorResponse, showNotiFromText } from './notification';

export function getStoreApi(storeId: string) {
  return axios.get(`/stores/${storeId}`);
}

export function saveStoreApi(data: { storeId: string, payload: Store }) {
  const payload = { ...data.payload };
  delete payload.id;
  return axios.put(`/stores/${data.storeId}`, payload);
}

export function* watchGetStore() {
  yield takeEvery(GET_STORE_FROM_API, function*(data: IAction) {
    const { payload } = data;
    try {
      const store = yield call(getStoreApi, payload.storeId);
      yield put(setStore(store.data))
    } catch (e) {
      yield showNotiFormErrorResponse(e);
    }
  })
}

export function* watchSaveStore() {
  yield takeEvery(SAVE_STORE, function*(data: IAction) {
    const { payload } = data;
    if (payload.id) {
      try {
        yield call(saveStoreApi, { storeId: payload.id || '', payload });
        yield put(setStore(payload));
        yield showNotiFromText('Saved');
      } catch (e) {
        yield showNotiFormErrorResponse(e);
      }
    }
  });
}