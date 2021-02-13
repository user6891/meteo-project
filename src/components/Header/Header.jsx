import React from 'react';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFor5Days, getCurrentData, getAllData } from '../../store/meteo-reducer';
import { useHistory } from 'react-router-dom';
import { setSearchErrorAC } from '../../store/app-state-reducer';
import { getSearchError } from '../../store/app-state-selector';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const stateError = useSelector((state) => getSearchError(state));
  const onSearch = async (text) => {
    try {
      await dispatch(getAllData(text));
      //await dispatch(getCurrentData(text));
      dispatch(setSearchErrorAC(false));
      history.push(`/${text}/`);
    } catch (error) {
      console.log('Header: ', error);
      dispatch(setSearchErrorAC(true));
    }
  };
  return (
    <div>
      <Search onSearch={onSearch} />
      {stateError ? <div>Not found city</div> : ''}
    </div>
  );
}

export default Header;
