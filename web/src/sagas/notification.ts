import { SHOW_NOTIFICATION } from '../store/actions';
import { takeEvery } from 'redux-saga/effects';

import { notification } from 'antd';
import IAction from '../store/action.interface';

const openNotification = (data: INotification) => {
  switch(data.type) {
    case 'success':
      notification.open({
        message: data.text,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      break;
    case 'error':
      notification.error({
        message: data.text,
        onClick: () => {
          console.log('Notification Clicked!');
        },
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