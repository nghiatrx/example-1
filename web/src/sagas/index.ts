import { fork } from 'redux-saga/effects'
import axios from 'axios';
import { watchGetStore, watchSaveStore } from './store';
import { watchDistrictsAction } from './district';
import { watchCitiesAction } from './city';
import { watchNotification } from './notification';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function* rootSaga() {
  yield fork(watchGetStore)
  yield fork(watchSaveStore)
  yield fork(watchDistrictsAction)
  yield fork(watchCitiesAction)
  yield fork(watchNotification)
}
