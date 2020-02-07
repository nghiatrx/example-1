import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reduxSaga from 'redux-saga';
import storeinfo from './storeinfo/storeinfo.reducer';
import districts from './districts/districts.reducer';
import cities from './cities/cities.reducer';
import { reducer as formReducer } from 'redux-form';
import { rootSaga } from '../sagas';

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({ storeinfo, form: formReducer, districts, cities });

const saga = reduxSaga();
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(saga)
));

saga.run(rootSaga);

export default store;
