import { SHOW_NOTIFICATION, showNotification } from '../store/actions';
import { takeEvery, put } from 'redux-saga/effects';

import { notification } from 'antd';
import IAction from '../store/action.interface';

const openNotification = (data: INotification) => {
  switch(data.type) {
    case 'success':
      notification.open({
        message: data.text,
        onClick: () => {},
      });
      break;
    case 'error':
      notification.error({
        message: data.text,
        onClick: () => {},
      });
      break;
    default: break;
  }
};

export function* watchNotification() {
  yield takeEvery(SHOW_NOTIFICATION, function(data: IAction) {
    openNotification(data.payload);
  })
}

export interface INotification {
  text: string;
  type: 'error' | 'success';
}

export function* showNotiFormErrorResponse(e: any) {
  let text = 'Server Error';
  if (e.response && e.response.data && e.response.data.message) text = e.response.data.message;
  yield put(showNotification({ text, type: 'error' }));
}

export function* showNotiFromText(text: string) {
  yield put(showNotification({ text, type: 'success' }));
}