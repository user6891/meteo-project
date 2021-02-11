import React from 'react';
import Tab from './Tab';
import classNames from 'classnames';

import style from './TabWrap.module.css';

function TabWrap({ data, onClickTab, selected }) {
  return (
    <div className={style.tabWrap}>
      {data.map((el, id) => (
        <Tab onClick={onClickTab} {...el} className={classNames({ active: selected === el.id })} />
      ))}
    </div>
  );
}

export default TabWrap;
