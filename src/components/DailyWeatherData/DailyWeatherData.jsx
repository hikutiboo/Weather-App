import { Temperature, WeatherIcon } from "../components";
import "./daily-weather-data.css";
import React from 'react';

function DailyWeatherData({ weatherData }) {

    let weather = weatherData["weather"],
        units = weatherData["units"];

    function HourItemConstructor(date, id) {
        let thisDateData = new Date(date);

        this.id = id;
        this.day = getDay();
        this.weathercode = weather["weathercode"][id];
        this.temp_min = Math.round(weather["temperature_2m_min"][id]);
        this.temp_max = Math.round(weather["temperature_2m_max"][id]);
        this.app_temp_min = Math.round(weather["apparent_temperature_min"][id]);
        this.app_temp_max = Math.round(weather["apparent_temperature_max"][id]);
        this.precipitation_chance = weather["precipitation_probability_max"][id];
        this.wind_speed = weather["windgusts_10m_max"][id];
        this.wind_gusts = weather["windspeed_10m_max"][id];

        function getDay() {
            let dayNumber = thisDateData.getDay();

            switch (dayNumber) {
                case 0:
                    return "Sun";

                case 1:
                    return "Mon";

                case 2:
                    return "Tue";

                case 3:
                    return "Wed";

                case 4:
                    return "Thur";

                case 5:
                    return "Fri";

                case 6:
                    return "Sat";

                default:
                    break;
            }
        }
    }

    return (
        <div className="daily-weather-data-container">
            <ul className="daily-weather-list">
                {
                    weather["time"].map((date, i) => {
                        let itemData = new HourItemConstructor(date, i);

                        return (
                            <li key={"daily-item-" + itemData.id} className="day-item">
                                <span className="day">{itemData.day}</span>
                                <span className="weather-icon">
                                    <WeatherIcon weathercode={itemData.weathercode} />
                                </span>

                                <Temperature
                                    view={"short"}
                                    min={itemData.temp_min}
                                    min_app={itemData.temp_max}
                                    max={itemData.app_temp_min}
                                    max_app={itemData.app_temp_max}
                                    units={units["temperature_2m_min"]} />

                                <p className="precipitation">
                                    Precipitation: {itemData.precipitation_chance}{units["precipitation_probability_max"]}
                                </p>
                                <p className="daily-wind-data">
                                    Wind Speed: <br />
                                    {itemData.wind_speed} {units["windgusts_10m_max"]}, up <br />
                                    to {itemData.wind_gusts} {units["windspeed_10m_max"]}
                                </p>
                            </li>
                        )
                    })
                }
                {/* <li className="day-item">
                    <span className="day">Tue</span>
                    <span className="weather-type-icon">
                        <i className="fa-solid fa-sun"></i>
                    </span>
                    <Temperature view={"short"} min={22} min_app={31} />
                    <p className="cloud-cover">
                        Cloud cover: {20}%
                    </p>
                    <p className="precipitation">
                        Precipitation: {0}%
                    </p>
                    <p className="daily-wind-data">
                        Wind Speed: <br />
                        {5} {"m/s"}, and <br /> up
                        to {10} {"m/s"}
                    </p>
                </li>

                <li className="day-item">
                    <span className="day">Wed</span>
                    <span className="weather-type-icon">
                        <i className="fa-solid fa-sun"></i>
                    </span>
                    <Temperature view={"short"} min={22} min_app={31} />
                    <p className="cloud-cover">
                        Cloud cover: {20}%
                    </p>
                    <p className="precipitation">
                        Precipitation: {0}%
                    </p>
                    <p className="daily-wind-data">
                        Wind Speed: <br />
                        {5} {"m/s"}, and <br /> up
                        to {10} {"m/s"}
                    </p>
                </li>

                <li className="day-item">
                    <span className="day">Thu</span>
                    <span className="weather-type-icon">
                        <i className="fa-solid fa-sun"></i>
                    </span>
                    <Temperature view={"short"} min={22} min_app={31} />
                    <p className="cloud-cover">
                        Cloud cover: {20}%
                    </p>
                    <p className="precipitation">
                        Precipitation: {0}%
                    </p>
                    <p className="daily-wind-data">
                        Wind Speed: <br />
                        {5} {"m/s"}, and <br /> up
                        to {10} {"m/s"}
                    </p>
                </li>

                <li className="day-item">
                    <span className="day">Fri</span>
                    <span className="weather-type-icon">
                        <i className="fa-solid fa-sun"></i>
                    </span>
                    <Temperature view={"short"} min={22} min_app={31} />
                    <p className="cloud-cover">
                        Cloud cover: {20}%
                    </p>
                    <p className="precipitation">
                        Precipitation: {0}%
                    </p>
                    <p className="daily-wind-data">
                        Wind Speed: <br />
                        {5} {"m/s"}, and <br /> up
                        to {10} {"m/s"}
                    </p>
                </li>

                <li className="day-item">
                    <span className="day">Sat</span>
                    <span className="weather-type-icon">
                        <i className="fa-solid fa-sun"></i>
                    </span>
                    <Temperature view={"short"} min={22} min_app={31} />
                    <p className="cloud-cover">
                        Cloud cover: {20}%
                    </p>
                    <p className="precipitation">
                        Precipitation: {0}%
                    </p>
                    <p className="daily-wind-data">
                        Wind Speed: <br />
                        {5} {"m/s"}, and <br /> up
                        to {10} {"m/s"}
                    </p>
                </li> */}
            </ul>
        </div>
    )
}

export default DailyWeatherData