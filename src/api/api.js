import axios from 'axios';

const API_KEY = '9e4b03d1df4d23ab907deb5cf9459ea8';

export const getMeteoDataFor5Days = async (city = 'Kyiv', lang = 'en') => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`,
  );
  console.log('getMeteoDataFor5Days ', response);
  return { list: response.data.list, city: response.data.city };
};

export const getCurrentMeteoData = async (city = 'Kyiv', lang = 'en') => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`,
  );
  console.log('getCurrentMeteoData ', response);
  return response.data;
};
