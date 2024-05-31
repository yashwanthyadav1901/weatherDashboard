import React, { useEffect, useState } from "react";
import sunny from "./../assets/Sunny.jpg";
import snow from "./../assets/snow.jpg";
import clear from "./../assets/Clear.jpg";
import cloudy from "./../assets/Cloudy.jpg";
import fog from "./../assets/fog.png";
import rainy from "./../assets/Rainy.jpg";
import stormy from "./../assets/Stormy.jpg";

import {
  getCurrentLocationWeatherData,
  getFormattedWeatherData,
} from "./../weatherService";
import TaskBar from "./taskBar";
import Story from "./Story";
import Citynotfound from "./Citynotfound";

const Weather = () => {
  const [city, setCity] = useState("hyderabad");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(sunny);
  const windUnit = units === "metric" ? "m/s" : "m/h";
  const tempUnit = units === "metric" ? "°C" : "°F";

  useEffect(() => {
    const fetchWeatherData = async () => {
      let data = await getFormattedWeatherData(city, units);
      setWeather(data);
      updateBackground(data.description);
    };

    fetchWeatherData();
  }, [city, units]);

  const updateBackground = (description) => {
    if (description.includes("storm")) {
      setBg(stormy);
    } else if (description.includes("cloud")) {
      setBg(cloudy);
    } else if (description.includes("snow")) {
      setBg(snow);
    } else if (description.includes("clear")) {
      setBg(clear);
    } else if (description.includes("fog")) {
      setBg(fog);
    } else if (description.includes("rain")) {
      setBg(rainy);
    } else {
      setBg(sunny);
    }
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let data = await getCurrentLocationWeatherData(
          latitude,
          longitude,
          units
        );
        setWeather(data);
        updateBackground(data.description);
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  };

  const handleUnitsClick = (e) => {
    const isCelsius = units === "metric";
    setUnits(isCelsius ? "imperial" : "metric");
    e.currentTarget.innerText = isCelsius ? "°C" : "°F";
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const storiesData = [
    { imageSrc: sunny, altText: "Story 1" },
    { imageSrc: snow, altText: "Story 2" },
    { imageSrc: cloudy, altText: "Story 3" },
    { imageSrc: clear, altText: "Story 4" },
    { imageSrc: fog, altText: "Story 5" },
    { imageSrc: stormy, altText: "Story 6" },
  ];

  if (!weather) {
    return <Citynotfound />;
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <>
            <nav className="nav">
              <div>
                <button className="nav-logo" onClick={handleCurrentLocation}>
                  Current Location
                </button>
              </div>
              <div className="nav-section nav-section__inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter City..."
                />
                <button onClick={(e) => handleUnitsClick(e)}>
                  °{units === "metric" ? "F" : "C"}
                </button>
              </div>
            </nav>
            <section className="main">
              <div className="section section__temperature">
                <div className="temperature">
                  <img
                    src={weather.iconURL}
                    alt="weatherIcon"
                    className="icon"
                  />
                  <h1>{`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}</h1>
                </div>
                <div className="desc">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <h3>{weather.formattedDate}</h3>
                </div>
                <div className="desc-cards">
                  <div className="desc-card blue">
                    <h2>Wind Speed</h2>
                    <p>{`${weather.speed.toFixed()} ${windUnit}`}</p>
                  </div>
                  <div className="desc-card green">
                    <h2>Humidity</h2>
                    <p>{`${weather.humidity}%`}</p>
                  </div>
                </div>
                <div className="feels_like">
                  <h2>Feels Like</h2>
                  <h2>{`${weather.feels_like.toFixed()} ${tempUnit}`}</h2>
                </div>
                <div className="underline">
                  <hr />
                </div>
                <div className="description">
                  <p>{weather.description}</p>
                </div>
              </div>
              <div className="section section_temparature">
                <TaskBar />
              </div>
            </section>
            <div className="story-container">
              <h1>Checkout today's climate stories in your area</h1>
              <div className="stories">
                {storiesData.map((story, index) => (
                  <Story
                    key={index}
                    imageSrc={story.imageSrc}
                    altText={story.altText}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
