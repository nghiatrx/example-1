
import { SET_STORE } from '../actions';
import { Store } from './storeinfo.interface';
import IAction from '../action.interface';

const initialState: Store = {}

export default function (state: Store = initialState, action: IAction) {
  switch(action.type) {
    case SET_STORE:
      return { ...action.payload }
  }
  return state
}
