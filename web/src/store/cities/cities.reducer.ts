
import { SET_CITIES } from '../actions';
import { City } from './city.interface';
import IAction from '../action.interface';

const initialState: City[] = []

export default function (state: City[] = initialState, action: IAction) {
  switch(action.type) {
    case SET_CITIES:
      return [ ...action.payload ]
  }
  return state
}
