import { getMeteoDataFor5Days } from '../api/api';

const SET_DATA = 'SET_DATA';
const initialState = {
  items: [],
};

export const meteoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

const setDataAC = (payload) => ({ type: SET_DATA, payload });

export const getData = (city) => async (dispatch) => {
  const data = await getMeteoDataFor5Days(city);
  dispatch(setDataAC(data));
};

//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
