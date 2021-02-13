import React from 'react';
import style from './Tab.module.css';

import classNames from 'classnames';

function Tab({ className, onClick, id, dateTitle, icon, time, ...props }) {
  return (
    <div
      className={classNames(style.tab, { [style.active]: className })}
      onClick={() => onClick(id)}>
      <div>
        <div>{dateTitle}</div>
        <div>{time}</div>
        {props?.temp ? (
          <div>
            <div>{props.temp}</div>
            <div>feels like {props.feelsLike}</div>
          </div>
        ) : (
          <div>
            <div>{props.tempMin}</div>
            <div>{props.tempMax}</div>
            <div>{props.precipitation}</div>
          </div>
        )}
      </div>
      <div>
        <img src={icon} alt="" />
      </div>
    </div>
  );
}

export default Tab;
