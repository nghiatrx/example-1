
import { SET_DISTRICTS } from '../actions';
import { District } from './district.interface';
import IAction from '../action.interface';

const initialState: { [key: string]: District[] } = {}

export default function (state: { [key: string]: District[] } = initialState, action: IAction) {
  switch(action.type) {
    case SET_DISTRICTS:
      const newState = { ...state }
      newState[action.payload.cityId] = action.payload.districts
      return newState
  }
  return state
}
