import React from 'react';
import ForecastWrap from './Forecast/ForecastWrap';
import TabWrap from './TabWrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentWeatherSelector,
  getCityName,
  getDataForTabs,
  getProcessedData,
} from '../store/meteo-selector';
import style from './ContentWrap.module.css';
import { useHistory } from 'react-router-dom';
import { getFocusTab, getSelectedTab } from '../store/app-state-selector';
import { setFocusTabAC, setSelectedTabAC } from '../store/app-state-reducer';

function ContentWrap() {
  const history = useHistory();
  const dispatch = useDispatch();
  const focusTab = useSelector((state) => getFocusTab(state));
  const selectedTab = useSelector((state) => getSelectedTab(state));
  //const [prevFocusTab, setPrevFocusTab] = React.useState(1);
  const nowData = useSelector((state) => currentWeatherSelector(state));
  const city = useSelector((state) => getCityName(state));

  const tabsData = useSelector((state) => getDataForTabs(state)).slice(focusTab - 1, focusTab + 2);
  const dataForForecast = useSelector((state) => getProcessedData(state));
  //console.log('selectedTab: ', selectedTab, 'focusTab: ', focusTab);
  const onClickTab = (id) => {
    if (id > 0) {
      dispatch(setFocusTabAC(id));
    }
    history.push(`${id}`);
    dispatch(setSelectedTabAC(id));
  };
  //console.log('tabsData', tabsData);
  return (
    <div>
      <div>
        Weather in {city}{' '}
        {selectedTab === 0
          ? 'Now'
          : tabsData[1].time
          ? tabsData[1].time
          : tabsData[1].dateTitle.slice(4)}
      </div>
      <TabWrap data={tabsData} onClickTab={onClickTab} focus={focusTab} selected={selectedTab} />
      <ForecastWrap
        now={selectedTab === 0 ? nowData : null}
        data={dataForForecast[selectedTab - 1]}
      />
    </div>
  );
}

export default ContentWrap;
