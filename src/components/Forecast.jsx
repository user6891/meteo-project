import React from 'react';
import { useSelector } from 'react-redux';
import { getProcessedData } from '../store/meteo-selector';
import style from './Forecast.module.css';

function Forecast() {
  const data = useSelector((state) => getProcessedData(state)[0]);
  if (data) {
    const emptyItems = Array(8 - data.length).fill(0);
    return (
      <div className={style.wrap}>
        <div className={style.wrapContent}>
          {emptyItems.map(() => (
            <div key={Math.random()}>
              <div>000 </div>
              <div>000 </div>
              <div>000</div>
            </div>
          ))}
          {data.map((el, id) => (
            <div key={`${id}_${el.temp}_${el.time}`}>
              <div>{el.time}:00 </div>
              <div>{el.temp} </div>
              <div>
                <img src={el.icon} alt="" />{' '}
              </div>
            </div>
          ))}
        </div>
        <div>Wind speed, m/s</div>
        <div className={style.wrapContent}>
          {emptyItems.map(() => (
            <div key={Math.random()}>000 </div>
          ))}
          {data.map((el, id) => (
            <div key={`${id}_${el.temp}_${el.time}`}>{el.windSpeed}</div>
          ))}
        </div>
        <div>Volume of precipitation</div>
        <div className={style.wrapContent}>
          {emptyItems.map(() => (
            <div key={Math.random()}>000 </div>
          ))}
          {data.map((el, id) => (
            <div key={`${id}_${el.temp}_${el.time}`}>{el.precipitation}</div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>LOADING</div>;
  }
}

export default Forecast;
