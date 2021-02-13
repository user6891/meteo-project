import React from 'react';
import { Route } from 'react-router-dom';
import ForecastNow from './ForecastNow';
import Forecast from './Forecast';

function ForecastWrap({ data, now }) {
  return <div>{now ? <ForecastNow data={now} /> : <Forecast data={data} />}</div>;
}

export default ForecastWrap;
