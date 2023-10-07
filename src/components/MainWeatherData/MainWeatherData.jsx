import './main-weather-data.css';
import { Temperature, WeatherIcon } from '../components';
import React from 'react';

function MainWeatherData({ currentCity, weatherData, error, setLoading }) {

    let cityData = "name" in currentCity[0] ? currentCity[0] : {},
        cityName = cityData.name + ", " + cityData.country,
        currentDate = new Date(),
        currentHour = currentDate.getHours();

    if ("daily" in weatherData && !error[0]) {
        let dailyData = weatherData["daily"],
            hourlyData = weatherData["hourly"],
            currentDayWeather = {
                min: Math.round(dailyData["weather"]["temperature_2m_min"][0]),
                min_app: Math.round(dailyData["weather"]["apparent_temperature_min"][0]),
                max: Math.round(dailyData["weather"]["temperature_2m_max"][0]),
                max_app: Math.round(dailyData["weather"]["apparent_temperature_max"][0]),
                units: dailyData["units"]["temperature_2m_min"]
            };

        function hourlyDataItem(item) {
            return hourlyData["weather"][item][currentHour];
        }

        return (
            <div className="main-weather-data-container">
                <div className="main-data-header">
                    <h1 className="city-name">
                        {cityName}
                    </h1>
                    <p className="precipitation-probability">
                        Chance of precipitation: {
                            dailyData["weather"]["precipitation_probability_max"][0]
                        }{dailyData["units"]["precipitation_probability_max"]}
                    </p>
                </div>

                <Temperature view={"full"} {...currentDayWeather} />

                <div className="weather-additional-data">
                    <span className="weather-icon">
                        <WeatherIcon time={currentHour} weathercode={hourlyDataItem("weathercode")}/>
                    </span>
                    <p className="cloud-cover additionl-data-text">
                        Cloud cover: {hourlyDataItem("cloudcover")}
                        {hourlyData["units"]["cloudcover"]}
                    </p>
                    <p className="wind-data additionl-data-text">
                        Wind speed: {hourlyDataItem("windspeed_10m")} {hourlyData["units"]["windspeed_10m"]} <br />
                        and up to: {hourlyDataItem("windgusts_10m")} {hourlyData["units"]["windgusts_10m"]}
                    </p>
                </div>
            </div>
        )
    };

    return '';
}

export default MainWeatherData