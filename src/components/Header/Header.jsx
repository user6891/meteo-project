import React from 'react';
import Search from './Search';
import { useDispatch } from 'react-redux';
import { getDataFor5Days, getCurrentData } from '../../store/meteo-reducer';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onSearch = (text) => {
    dispatch(getDataFor5Days(text));
    dispatch(getCurrentData(text));
    history.push(`/${text}/`);
  };
  return (
    <div>
      <Search onSearch={onSearch} />
    </div>
  );
}

export default Header;
