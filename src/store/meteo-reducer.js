import { getMeteoDataFor5Days, getCurrentMeteoData } from '../api/api';
import { dataHandler } from '../tools';
import { setInitializeAppAC, setTabDefault } from './app-state-reducer';

const SET_DATA = 'SET_DATA';
const SET_CURRENT_DATA = 'SET_CURRENT_DATA';
const SET_LOADING_WEATHER_DATA = 'SET_LOADING_WEATHER_DATA';
const SET_CITY_DATA = 'SET_CITY_DATA';
const SET_PROCESSED_DATA = 'SET_PROCESSED_DATA';
const initialState = {
  itemsRaw: [],
  currentWeather: {},
  loading: true,
  city: {},
  processedData: [],
};

export const meteoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, itemsRaw: action.payload };
    case SET_CURRENT_DATA:
      return { ...state, currentWeather: action.payload };
    case SET_LOADING_WEATHER_DATA:
      return { ...state, loading: action.payload };
    case SET_CITY_DATA:
      return { ...state, city: action.payload };
    case SET_PROCESSED_DATA:
      return { ...state, processedData: dataHandler(action.payload) };

    default:
      return state;
  }
};

const setCityDataAC = (payload) => ({ type: SET_CITY_DATA, payload });
const setDataAC = (payload) => ({ type: SET_DATA, payload });
const setProcessedDataAC = (payload) => ({ type: SET_PROCESSED_DATA, payload });
const setCurrentDataAC = (payload) => ({ type: SET_CURRENT_DATA, payload });
const setLoadingWeatherAC = (payload) => ({ type: SET_LOADING_WEATHER_DATA, payload });

export const getAllData = (city, lang) => async (dispatch) => {
  try {
    dispatch(setLoadingWeatherAC(true));
    const data5 = await getMeteoDataFor5Days(city, lang);
    const dataCurrent = await getCurrentMeteoData(city, lang);
    dispatch(setCurrentDataAC(dataCurrent));
    dispatch(setDataAC(data5.list));
    dispatch(setCityDataAC(data5.city));
    dispatch(setProcessedDataAC(data5));
    dispatch(setLoadingWeatherAC(false));
    dispatch(setInitializeAppAC());
    dispatch(setTabDefault());
  } catch (error) {
    dispatch(setLoadingWeatherAC(false));
    console.log('getAllData: ', error);
    throw error;
  }

  //dispatch(setProcessedDataAC({ current: dataCurrent, list: data5.list }));
};

/**
 * set weather data for 5 days;
 * array length 40; includes weather forecast data with 3-hour step
 * @param {string} city
 * @param {string} lang
 */
export const getDataFor5Days = (city, lang) => async (dispatch) => {
  dispatch(setLoadingWeatherAC(true));
  try {
    const data = await getMeteoDataFor5Days(city, lang);
    dispatch(setDataAC(data.list));
    dispatch(setCityDataAC(data.city));
    dispatch(setProcessedDataAC(data));
    dispatch(setLoadingWeatherAC(false));
  } catch (error) {
    console.log('getDataFor5Days catch');
    dispatch(setLoadingWeatherAC(false));
    dispatch(setLoadingWeatherAC(true));
    throw error;
  }
};

/**
 * return current weather data;
 * see all parameters on https://openweathermap.org/current#multi
 * @return {object}
 * @param {string} city
 * @param {string} lang
 */
export const getCurrentData = (city, lang) => async (dispatch) => {
  dispatch(setLoadingWeatherAC(true));
  try {
    const data = await getCurrentMeteoData(city, lang);
    dispatch(setCurrentDataAC(data));
    dispatch(setLoadingWeatherAC(false));
  } catch (error) {
    console.log('getCurrentData catch');
    dispatch(setLoadingWeatherAC(false));
    dispatch(setLoadingWeatherAC(true));
    throw error;
  }
};

//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
