import React from 'react';
import weathercodes from "../../configs/weathercodes_db";
import "./weather-icon.css";

function WeatherIcon({ time = 12, weathercode = 0 }) {
    let night = time <= 5 || time >= 20 ? true : false,
        errorIcon = <i className="fa-solid fa-triangle-exclamation error-icon icon"></i>,
        icon = weathercodes[weathercode] != undefined ? weathercodes[weathercode][night ? "night" : "day"] : errorIcon;

    return (
        <>
            {icon}
        </>
    );
}

export default WeatherIcon;