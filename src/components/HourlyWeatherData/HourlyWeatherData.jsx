import './hourly-weather-data.css';
import { Temperature, WeatherIcon } from '../components';
import React, { useEffect, useRef } from 'react';

function HourlyWeatherData({ weatherData }) {

    const hourlyListRef = useRef(null)

    let weather = weatherData["weather"],
        units = weatherData["units"],
        step = JSON.parse(localStorage.getItem("currentSettings"))["additionta_data"]["hourly_items_step"];

    changeWeather();

    useEffect(() => {
        hourlyListRef.current.style.gridTemplate = `repeat(2, 1fr) / repeat(${weather["time"].length / 2}, 1fr)`;
    })

    function changeWeather() {
        let newWeather = {};

        for (const key in weather) {
            newWeather[key] = [];

            weather[key].forEach((item, i) => {
                if (!(i % step)) newWeather[key].push(item);
            });
        }

        weather = newWeather;
    }

    function HourItemConstructor(hour, id) {
        let thisHourData = new Date(hour);

        this.id = id;
        this.time = getTime();
        this.weathercode = weather["weathercode"][id];
        this.temp = Math.round(weather["temperature_2m"][id]);
        this.app_temp = Math.round(weather["apparent_temperature"][id]);
        this.cloud_cover = weather["cloudcover"][id];
        this.wind_speed = weather["windspeed_10m"][id];
        this.wind_gusts = weather["windgusts_10m"][id];

        function getTime() {
            let hours = String(thisHourData.getHours()),
                minutes = String(thisHourData.getMinutes());

            hours = hours.length <= 1 ? "0" + hours : hours;
            minutes = minutes.length <= 1 ? "0" + minutes : minutes;

            return hours + ":" + minutes;
        }
    }

    return (
        <div className="hourly-weather-data-container">
            <ul ref={hourlyListRef} className="hourly-list">
                {
                    weather["time"].map((time, i) => {
                        let itemData = new HourItemConstructor(time, i);

                        return (
                            <li key={"hour-item-" + itemData.id} className="hour-item">
                                <span className="hour">{itemData.time}</span>
                                <span className="weather-icon">
                                    <WeatherIcon time={new Date(time).getHours()} weathercode={itemData.weathercode} />
                                </span>
                                <Temperature view={"short"} min={itemData.temp} min_app={itemData.app_temp} units={units["temperature_2m"]} />
                                <p className="cloud-cover">
                                    Cloud cover: <br />
                                    {itemData.cloud_cover}{units["cloudcover"]}
                                </p>
                                <p className="hourly-wind-data">
                                    Wind Speed <br />
                                    {itemData.wind_speed} {units["windspeed_10m"]} up <br />
                                    to {itemData.wind_gusts} {units["windgusts_10m"]}
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default HourlyWeatherData