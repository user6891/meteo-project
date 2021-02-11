import React from 'react';
import { Route } from 'react-router-dom';
import ForecastNow from './ForecastNow';
import Forecast from './Forecast';

function ForecastWrap({ data }) {
  return (
    <div>
      <Route exact path="/:city/">
        <ForecastNow />
      </Route>
      <Route exact path="/:city/0">
        <ForecastNow />
      </Route>
      <Route path="/:city/:id">
        <Forecast data={data} />
      </Route>
    </div>
  );
}

export default ForecastWrap;
