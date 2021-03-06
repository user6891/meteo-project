import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentFullDateStr } from '../../tools';
import { currentWeatherSelector } from '../../store/meteo-selector';
import style from './ForecastNow.module.css';

function ForecastNow({ data }) {
  const currentDate = getCurrentFullDateStr();
  const {
    temp,
    windSpeed,
    sunrise,
    sunset,
    pressure,
    humidity,
    feelsLike,
    description,
    windDirection,
  } = data;
  return (
    <div className={style.wrap}>
      <div className={style.title}>{currentDate}</div>
      <div className={style.content}>
        <div className={style.mainContent}>
          <div>sunrise: {sunrise}</div>
          <div>{temp}</div>
          <div>sunset: {sunset}</div>
        </div>
        <div>Feels like: {feelsLike}</div>
        <div>{description}</div>
      </div>
      <div className={style.footer}>
        <div>
          wind: {windSpeed} m/s {windDirection}
        </div>
        <div>pressure: {pressure}</div>
        <div>humidity: {humidity}</div>
      </div>
    </div>
  );
}

export default ForecastNow;
