import React from 'react';
import { getDataFor5Days,getCurrentData,getAllData } from './store/meteo-reducer';
import {getLoading} from './store/meteo-selector'
import style from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ForecastNow from './components/ForecastNow';
import Forecast from './components/Forecast';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => getLoading(state))
  
  React.useEffect(() => {
    dispatch(getDataFor5Days('Kyiv'));dispatch(getCurrentData('Kyiv'));
  }, [])
 

  return (
    <div className={style.App}>
      <div className={style.header}>1</div>
      <div className={style.content}>{loading ? <div>loading...</div> :<Forecast />} </div>
      <div className={style.ads}>3</div>
    </div>
  );
}

export default App;
