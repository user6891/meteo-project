import { combineReducers } from 'redux';
import { meteoReducer } from './meteo-reducer';
import { appStateReducer } from './app-state-reducer';

export default combineReducers({
  meteoReducer,
  appStateReducer,
});
