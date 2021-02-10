import { createSelector } from 'reselect';
import { getTimeOfDate, degreesToDirection } from '../tools';

const getCurrentWeather = (state) => {
  //console.log('meteo-selector getCurrentWeather ', state.meteoReducer.currentWeather);
  return state.meteoReducer.currentWeather;
};
const getWeather = (state) => {
  return state.meteoReducer.items;
};
export const getProcessedData = (state) => state.meteoReducer.processedData;
export const getLoading = (state) => state.meteoReducer.loading;

export const currentWeatherSelector = createSelector(getCurrentWeather, (currentWeather) => {
  //console.log('currentWeatherSelector ', currentWeather);
  const temp = currentWeather.main.temp;
  const windSpeed = currentWeather.wind.speed;
  const sunriseRaw = currentWeather.sys.sunrise;
  const sunsetRaw = currentWeather.sys.sunset;
  const windDegrees = currentWeather.wind.deg;
  const pressure = currentWeather.main.pressure;
  const humidity = currentWeather.main.humidity;
  const feelsLike = currentWeather.main.feels_like;
  const description = currentWeather.weather[0].description;
  const timezone = currentWeather.timezone;
  const sunrise = getTimeOfDate(sunriseRaw, timezone);
  const sunset = getTimeOfDate(sunsetRaw, timezone);
  const windDirection = degreesToDirection(windDegrees);
  return {
    temp,
    windSpeed,
    sunrise,
    sunset,
    pressure,
    humidity,
    feelsLike,
    description,
    windDirection,
  };
});
