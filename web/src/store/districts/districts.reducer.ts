
import { SET_DISTRICTS } from '../actions';
import { District } from './district.interface';
import IAction from '../action.interface';

const initialState: District[] = []

export default function (state: District[] = initialState, action: IAction) {
  switch(action.type) {
    case SET_DISTRICTS:
      return [ ...action.payload ]
  }
  return state
}
