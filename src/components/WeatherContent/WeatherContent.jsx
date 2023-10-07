import './weather-content.css';
import React, { useEffect, useRef, useState } from 'react';
import { MainWeatherData, HourlyWeatherData, DailyWeatherData, Loading, Error } from '../components';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import defaultSettings from "../../configs/default-settings.json";

function WeatherContent() {

    let { cityName } = useParams(),
        { getUrl } = useRequest(),
        { generalLoadingState, lastWatchedList, editLastWatchedList } = useOutletContext(),
        [currentCity, setCurrentCity] = useState([{}]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState([false, null]),
        [cityRequestPending, setCityRequestPending] = useState(false),
        [generalLoading, setGeneralLoading] = generalLoadingState,
        navigate = useNavigate(),
        weatherData = useRef({}),
        anotherRequestIsDone = useRef(false),
        cloudSettings = JSON.parse(localStorage.getItem("currentSettings")),
        settings = cloudSettings ? cloudSettings : defaultSettings,
        cityUrlBase = "https://api.api-ninjas.com/v1/city?name=",
        cityBaseHeaders = { "X-Api-Key": settings["additionta_data"]["city_API_key"] },
        urlBase = `https://api.open-meteo.com/v1/forecast?latitude=${currentCity[0].latitude}&longitude=${currentCity[0].longitude}`,
        dailyURL = `&forecast_days=7&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant`,
        hourlyURL = `&forecast_days=1&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,cloudcover,windspeed_10m,windgusts_10m`,
        weatherRequestSettings = settingWeatherRequestSettings();

    useEffect(() => {
        setLoading(true);
        setError([false, null]);
    }, []);

    useEffect(() => {
        if (currentCity[0].name === cityName && !error[0]) {
            getFullWeatherData();
        }
    }, [currentCity]);

    useEffect(() => {
        if (!cityRequestPending) {
            anotherRequestIsDone.current = true;
            setCityRequestPending(true);
            setLoading(true);
            getCityData(cityUrlBase + cityName, cityBaseHeaders, setCurrentCity);
        }
    }, [cityName])

    useEffect(() => {
        setGeneralLoading(false);

        if (anotherRequestIsDone.current) {
            anotherRequestIsDone.current = false
        } else if (currentCity[0].name !== cityName && !error[0] && !cityRequestPending) {
            setCityRequestPending(true);
            setLoading(true);
            getCityData(cityUrlBase + cityName, cityBaseHeaders, setCurrentCity);
        }
    })

    function Content() {
        return (
            <>
                <MainWeatherData
                    currentCity={currentCity}
                    weatherData={weatherData["current"]}
                    error={error}
                    setLoading={setLoading} />
                <HourlyWeatherData
                    weatherData={weatherData["current"]["hourly"]}
                    error={error}
                    setLoading={setLoading} />
                <DailyWeatherData
                    weatherData={weatherData["current"]["daily"]} />
            </>
        )
    }

    async function simpleUrlProvider(url, headers) {
        let response = await getUrl(url, "GET", null, headers);

        return response;
    }

    async function getCityData(url, headers, resultFunction) {

        let response = await simpleUrlProvider(url, headers);

        if (typeof (response) != 'object') {
            setError([true, response.error]);
            setLoading(false);
        } else if ("error" in response) {
            resultFunction([response]);
            setError([true, "Wrong or unset API Key"]);
            setLoading(false);
        } else if (!response.length) {
            resultFunction([response]);
            setError([true, "City not found"]);
            setLoading(false);
        } else {
            setError([false, null]);
            editLastWatchedList(response[0].name);
            resultFunction(response);

            if (response[0].name !== cityName) navigate(`/city/${response[0].name}`);
        }

        setCityRequestPending(false);
    }

    async function getWeatherData(url, headers) {
        let response = await simpleUrlProvider(url, headers);

        if ("error" in response) {
            setError([true, response.reason]);
        }

        return response;
    }

    function getFullWeatherData() {
        setLoading(true);

        let getDailyWeather = getWeatherData(urlBase + weatherRequestSettings + dailyURL, undefined),
            getHourlyWeather = getWeatherData(urlBase + weatherRequestSettings + hourlyURL, undefined);

        Promise.all([getDailyWeather, getHourlyWeather]).then(
            ([getDailyWeather, getHourlyWeather]) => {

                if ("error" in getDailyWeather ||
                    "error" in getHourlyWeather) {
                    setError([true, "Something went wrong!"]);
                    return;
                }

                let loadedWeatherData = {
                    daily: {
                        weather: getDailyWeather["daily"],
                        units: getDailyWeather["daily_units"]
                    },
                    hourly: {
                        weather: getHourlyWeather["hourly"],
                        units: getHourlyWeather["hourly_units"]
                    }
                }

                setLoading(false);
                weatherData.current = loadedWeatherData;
            }
        );
    }

    function settingWeatherRequestSettings() {
        let base = '';

        for (const key in settings["weather"]) {
            if (settings["weather"][key] !== '') base += `&${key}=${settings["weather"][key]}`;
        }

        return base;
    }

    let component = loading || generalLoading ? <Loading /> :
        error[0] ? <Error error={error[1]} lastCity={lastWatchedList[0]} /> :
            !error[0] && !loading && !generalLoading ? <Content /> : '';

    return (
        <>
            {component}
        </>
    )
}

export default WeatherContent;