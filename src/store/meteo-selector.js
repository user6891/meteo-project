import { createSelector } from 'reselect';
import { getTimeOfDate, degreesToDirection, getIconById, getDateStr } from '../tools';

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

//[{dateTitle: xxx, time: xxx, precipitation: xxx, minTemp: xxx, maxTemp: xxx, icon: xxx, }]
export const getDataForTabs = createSelector(getCurrentWeather, getProcessedData, (cw, pd) => {
  const result = [
    {
      id: 0,
      temp: cw.main.temp,
      dateTitle: 'Now',
      time: getTimeOfDate(cw.dt, cw.timezone),
      feelsLike: cw.main.feels_like,
      icon: getIconById(cw.weather[0].id),
    },
  ];
  for (let i = 0; i < pd.length; i++) {
    const element = pd[i];

    const temps = element.map((el) => el.temp);
    const tempMax = Math.max.apply(Math, temps);
    const tempMin = Math.min.apply(Math, temps);
    const icon = Math.min.apply(
      Math,
      element.map((el) => el.iconId),
    );
    const precipitation = element.map((el) => el.precipitation).reduce((a, c) => a + c);
    const dateTitle = getDateStr(element[0].dts);
    console.log('element[0].dt: ', element[0].dts);
    const time = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : null;
    result.push({
      id: i + 1,
      tempMax,
      tempMin,
      icon: getIconById(icon),
      precipitation,
      dateTitle,
      time,
    });
  }
  console.log('getDataForTabs: ', result);
  return result;
});
