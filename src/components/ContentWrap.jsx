import React from 'react';
import ForecastWrap from './Forecast/ForecastWrap';
import TabWrap from './TabWrap';
import { useSelector } from 'react-redux';
import { getDataForTabs, getProcessedData } from '../store/meteo-selector';
import style from './ContentWrap.module.css';
import { useHistory, useParams } from 'react-router-dom';

function ContentWrap() {
  const history = useHistory();
  const [focusTab, setFocusTab] = React.useState(1);
  const [prevFocusTab, setPrevFocusTab] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const tabsData = useSelector((state) => getDataForTabs(state)).slice(focusTab - 1, focusTab + 2);
  const dataForForecast = useSelector((state) => getProcessedData(state));
  const onClickTab = (id) => {
    if (id > 0) {
      setFocusTab(id);
    }
    history.push(`${id}`);
    setSelectedTab(id);
  };
  return (
    <div>
      <TabWrap data={tabsData} onClickTab={onClickTab} focus={focusTab} selected={selectedTab} />
      <ForecastWrap data={dataForForecast[selectedTab - 1]} />
    </div>
  );
}

export default ContentWrap;
