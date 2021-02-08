import axios from 'axios';

export const getMeteoDataFor5Days = async (city = 'Kyiv') => {
  const API_KEY = '9e4b03d1df4d23ab907deb5cf9459ea8';
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );
    console.log(response);  
    return response.data.list;
  } catch (error) {
    console.log(error);
    return [];
  }
};
