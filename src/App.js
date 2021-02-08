import React from 'react';
import { getData } from './store/meteo-reducer';
import style from './App.module.css';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  dispatch(getData('Kyiv'));

  return (
    <div className={style.App}>
      <div className={style.header}>1</div>
      <div className={style.content}>2</div>
      <div className={style.ads}>3</div>
    </div>
  );
}

export default App;
