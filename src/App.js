import React from 'react';
import { getDataFor5Days, getCurrentData, getAllData } from './store/meteo-reducer';
import { getLoading } from './store/meteo-selector';
import style from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ContentWrap from './components/ContentWrap';
import { BrowserRouter, useParams } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => getLoading(state));
  const { city } = useParams();

  // React.useEffect(() => {
  //   dispatch(getDataFor5Days('Kyiv'));
  //   dispatch(getCurrentData('Kyiv'));
  // }, []);

  return (
    <BrowserRouter>
      <div className={style.App}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.content}>{loading ? <div>loading...</div> : <ContentWrap />} </div>
        <div className={style.ads}>3</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
