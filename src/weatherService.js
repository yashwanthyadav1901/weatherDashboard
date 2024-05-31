const API_KEY = "a6c4c5b03ff49cc38eb5bd5c8cf5a223";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    const unixTimestamp = data.dt;

    const date = new Date(unixTimestamp * 1000);

    const formattedDate = date.toLocaleString();

    if (response.ok) {
      const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
      } = data;

      const { description, icon } = weather[0];

      return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
        formattedDate,
      };
    } else {
      console.error("Error fetching weather data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const getCurrentLocationWeatherData = async (lat, long, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    const unixTimestamp = data.dt;

    const date = new Date(unixTimestamp * 1000);

    const formattedDate = date.toLocaleString();

    if (response.ok) {
      const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
      } = data;

      const { description, icon } = weather[0];

      return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
        formattedDate,
      };
    } else {
      console.error("Error fetching weather data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export { getFormattedWeatherData, getCurrentLocationWeatherData };
