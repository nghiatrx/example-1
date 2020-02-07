
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import { GET_STORE_FROM_API, setStore, SAVE_STORE, showNotification } from '../store/actions';
import { Store } from '../store/storeinfo/storeinfo.interface';
import IAction from '../store/action.interface';

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
    const store = yield call(getStoreApi, payload.storeId);
    yield put(setStore(store.data));
  });
}

export function* watchSaveStore() {
  yield takeEvery(SAVE_STORE, function*(data: IAction) {
    const { payload } = data;
    if (payload.id) {
      yield call(saveStoreApi, { storeId: payload.id || '', payload });
      yield put(setStore(payload));
      yield put(showNotification({ text: 'Saved', type: 'success' }));
    }
  });
}