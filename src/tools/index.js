/**
 * return current date in string
 * @return format 'day, [number day] month, hours:minute';
 * for example 'Tue, 9 February, 18:49'
 */
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
export const getCurrentFullDateStr = () => {
  const date = new Date();
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
};

/**
 * return current date in string;for example '18:49'
 * @return {string} string, format 'hour:minutes';
 * @param {number} seconds - count of seconds
 * @param {number} timezone - shift in seconds from UTC
 */
export const getTimeOfDate = (seconds, timezone) => {
  const date = new Date(seconds * 1000 - timezone);
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

// [
//    [
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x },
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x },
//    ],
//    [
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x },
//      { time: x, temp: x, icon: x, windSpeed: x, precipitation: x, description: x },
//    ]
//]
export const dataHandler = (data) => {
    const {current, list} = data;

    
  const hour = '';
  const icon = '';
  const temp = '';
  const windSpeed = '';
  const precipitation = '';
  const description = '';
  return {};
};
