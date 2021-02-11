const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
/**
 * return current date in string
 * @return format 'day, [number day] month, hours:minute';
 * for example 'Tue, 9 February, 18:49'
 */
export const getCurrentFullDateStr = () => {
  const date = new Date();
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
};
/**
 * return date without hours in string
 * @return format 'day, [number day] month';
 * for example 'Tue, 9 February, 18:49'
 * @param {number} seconds - count of seconds
 * @param {number} timezone - shift in seconds from UTC
 */
export const getDateStr = (seconds) => {
  const date = new Date(seconds);
  console.log('getDateStr', date);
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
};

/**
 * return current date in string;for example '18:49'
 * @return {string} string, format 'hour:minutes';
 * @param {number} seconds - count of seconds
 * @param {number} timezone - shift in seconds from UTC
 */
export const getTimeOfDate = (seconds, timezone) => {
  const date = new Date(seconds * 1000 + timezone);
  return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`;
};

/**
 * use for transform degrees of wind to direction;
 * N: 330-30, NE: 30-60, E: 60-120, SE: 120-150, S: 150-210, SW: 210-240, W:240-300, NW: 300-330;
 * return direction of wind in string;for example 'North';
 * @return {string} string, format 'hour:minutes';
 * @param {number} deg - degrees
 */
export const degreesToDirection = (deg) => {
  if (deg > 360 || deg < 0) {
    return false;
  } else if (deg < 30 || deg > 330) {
    return 'North';
  } else if (deg <= 60 && deg >= 30) {
    return 'Northeast';
  } else if (deg < 120 && deg > 60) {
    return 'East';
  } else if (deg <= 150 && deg >= 120) {
    return 'Southeast';
  } else if (deg < 210 && deg > 150) {
    return 'South';
  } else if (deg <= 240 && deg >= 210) {
    return 'Southwest';
  } else if (deg < 300 && deg > 240) {
    return 'West';
  } else if (deg <= 330 && deg >= 300) {
    return 'West';
  }
};

// const _11d = [200,201,202,210,211,212,221,230,231,232]
// const _09d = [520,521,522,531,300, 301,302,310,311,312,313,314,321]
// const _10d = [500,501,502,503,504]
// const _13d = [511,600,601,602,611,612,613,615,616,620,621,622]
// const _50d = [701,711,721,731,741,751,761,762,771,781]
// const _01d = [800] //_01n for night
// const _02d = [801] //_02n for night
// const _03d = [802] //_03n for night
// const _04d = [803,804] //_04n for night
const getIconNameById = (id) => {
  const data = {
    _11d: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    _09d: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321],
    _10d: [500, 501, 502, 503, 504],
    _13d: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    _50d: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    _01d: [800], //_01n for night
    _02d: [801], //_02n for night
    _03d: [802], //_03n for night
    _04d: [803, 804], //_04n for night
  };

  for (const key in data) {
    const element = data[key];
    if (element.includes(id)) {
      return key.slice(1);
    }
  }
};

/**
 * query for icon by id;
 * return icon url;
 * @return {string} string, format 'http://openweathermap.org/img/wn/${id}${@scale}.png';
 * @param {number} id - degrees
 * @param {string} scale - optional, possible values: '', '2x' '4x';
 * responsible for the scale of the icon
 */
export const getIconById = (id, scale = '') => {
  const icon = getIconNameById(id);
  if (scale === '2x' || scale === '4x') {
    console.log('getIconById: ', `http://openweathermap.org/img/wn/${icon}${'@' + scale}.png`);
    return `http://openweathermap.org/img/wn/${icon}${'@' + scale}.png`;
  } else {
    console.log('getIconById: ', `http://openweathermap.org/img/wn/${icon}.png`);
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }
};

const compareDMofDate = (seconds1, seconds2) => {
  const date1 = new Date(seconds1 * 1000);
  const date2 = new Date(seconds2 * 1000);
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth();
};

const getHoursOfDate = (seconds, timezone = 0) => {
  return new Date(seconds * 1000 + timezone).getHours();
};

const pullWeatherPropObj = (obj, timezone) => {
  return {
    time: getHoursOfDate(obj.dt, timezone),
    temp: obj.main.temp,
    windSpeed: obj.wind.speed,
    precipitation: obj?.snow?.['3h'] || obj?.rain?.['3h'] || 0,
    precipitationType: obj?.snow ? 'snow' : obj?.rain ? 'rain' : null,
    description: obj.weather[0].description,
    icon: getIconById(obj.weather[0].id),
    iconId: obj.weather[0].id,
    dts: obj.dt * 1000 + timezone,
  };
};

// [
//    [
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x:iconId:xxx},
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x:iconId:xxx },
//    ],
//    [
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x, iconId:xxx },
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x,iconId: xxx },
//    ]
//]
export const dataHandler = (data) => {
  const list = data.list;
  const timezone = data.city.timezone;

  const result = [];

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const prevElement = i > 0 ? list[i - 1] : null;
    if (i === 0) {
      result.push([pullWeatherPropObj(element, timezone)]);
      continue;
    } else if (compareDMofDate(element.dt, prevElement.dt)) {
      result[result.length - 1].push(pullWeatherPropObj(element, timezone));
    } else {
      result.push([pullWeatherPropObj(element, timezone)]);
    }
  }
  console.log('dataHandler: ', result);
  return result;
};
