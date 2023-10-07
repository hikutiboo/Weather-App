import { useNavigate, useOutletContext } from "react-router-dom";
import "./settings.css";
import React, { useEffect, useRef } from 'react';
import { Loading } from "../components";
import defaultSettings from "../../configs/default-settings.json";

function Settings() {

    const { generalLoadingState } = useOutletContext(),
        [generalLoading, setGeneralLoading] = generalLoadingState,
        citySettingsFormRef = useRef(null),
        weatherSettingsFormRef = useRef(null),
        container = useRef(null),
        navigate = useNavigate(),
        timezonesNames = [
            'Pacific/Midway',
            'America/Adak',
            'America/Anchorage',
            'America/Dawson',
            'America/Boise',
            'America/Bahia_Banderas',
            'America/Atikokan',
            'America/Anguilla',
            'America/Araguaina',
            'America/Noronha',
            'Atlantic/Azores',
            'Europe/London',
            'Europe/Stockholm',
            'Europe/Kiev',
            'Europe/Kaliningrad',
            'Indian/Reunion',
            'Antarctica/Mawson',
            'Antarctica/Vostok',
            'Antarctica/Davis',
            'Antarctica/Casey',
            'Asia/Tokyo',
            'Australia/Sydney',
            'Antarctica/Macquarie',
            'Antarctica/McMurdo'
        ];

    useEffect(() => {
        setGeneralLoading(false);
        currentSetter();
    })

    const Content = () => {

        return (
            <div ref={container} className="settings-container">
                <form ref={weatherSettingsFormRef} onSubmit={e => settingsChanger(e)} className="weather-settings-form settings-form">
                    <h1 className="settings-header">Settings</h1>
                    <div className="temperature-settings settings-item">
                        <p className="temperature-setting-header setting-header">Temperature Units</p>

                        <span className="setting-item cels">
                            <input className="setting-mark" type="radio" name="temperature_unit" id="temp_cels" value="" />
                            <label className="setting-text" htmlFor="temp_cels">Celsius (default)</label>
                        </span>

                        <span className="setting-item fahr">
                            <input className="setting-mark" type="radio" name="temperature_unit" id="temp_fahr" value="fahrenheit" />
                            <label className="setting-text" htmlFor="temp_fahr">Fahrenheit</label>
                        </span>
                    </div>

                    <div className="precipitation-settings settings-item">
                        <p className="precipitation-setting-header setting-header">Precipitation Units</p>

                        <span className="setting-item cels">
                            <input className="setting-mark" type="radio" name="precipitation_unit" id="precipitation_mills" value="" />
                            <label className="setting-text" htmlFor="precipitation_mills">Millimeter (default)</label>
                        </span>

                        <span className="setting-item fahr">
                            <input className="setting-mark" type="radio" name="precipitation_unit" id="precipitation_inch" value="fahrenheit" />
                            <label className="setting-text" htmlFor="precipitation_inch">Inch</label>
                        </span>
                    </div>

                    <div className="wind-speed-settings settings-item">
                        <p className="wind-speed-setting-header setting-header">Wind Speed Units</p>

                        <select className="windspeed-unit-select setting-select" name="windspeed_unit" id="windspeed_unit">
                            <option className="windspeed-unit-item setting-item" value="">Km/h (default)</option>
                            <option className="windspeed-unit-item setting-item" value="ms">m/s</option>
                            <option className="windspeed-unit-item setting-item" value="mph">Mph</option>
                            <option className="windspeed-unit-item setting-item" value="kn">Knots</option>
                        </select>
                    </div>

                    <div className="timezone-settings settings-item">
                        <p className="timezone-setting-header setting-header">Timezone</p>

                        <select className="timezone-select setting-select" name="timezone" id="timezone">
                            {
                                timezonesNames.map((item, i) => {
                                    return (
                                        <option key={"timezone-" + i} className="timezone-item setting-item" value={item}>
                                            {
                                                `${item} ${defaultSettings["timezone"] === item ? "(default)" : ''}`
                                            }
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </form>

                <form ref={citySettingsFormRef} onSubmit={e => settingsChanger(e)} className="city-settings-form settings-form">
                    <div className="city-api-key-settings settings-item">
                        <p className="city-api-key-setting-header setting-header">City API Key</p>
                        <p className="city-api-key-setting-secondary-header setting-secondary-header">
                            Register&nbsp;
                            <a className="city-api-link" href="https://api-ninjas.com/register"
                                target="_blank" rel="noopener noreferrer">
                                here
                            </a>
                            &nbsp; to get your own key, or keep field empty to use default
                        </p>
                        <p className="city-api-key-setting-secondary-header setting-secondary-header">
                            <span className="warning-item">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                Warning: using default API key can lead to unexpected termination of attempts!
                            </span>
                        </p>

                        <input name="city_API_key" type="text" className="city-api-key-input" placeholder="Api key" />
                    </div>
                    <div className="hourly-step-settings settings-item">
                        <p className="hourly-step-setting-header setting-header">Hourly items step</p>

                        <select className="windspeed-unit-select setting-select" name="hourly_items_step" id="hourly_items_step">
                            <option className="hourly-step-unit-item setting-item" value="2">2 (default)</option>
                            <option className="hourly-step-unit-item setting-item" value="3">3</option>
                            <option className="hourly-step-unit-item setting-item" value="4">4</option>
                            <option className="hourly-step-unit-item setting-item" value="6">6</option>
                        </select>
                    </div>
                    <button className="settings-submit-button" type="submit">Change Settings</button>
                </form>

                <div className="set-default-button-container">
                    <button onClick={setDefaultSettings} className="set-default-button">Default Settings</button>
                </div>
            </div>
        )
    }

    function currentSetter() {
        let cloudSettings = JSON.parse(localStorage.getItem("currentSettings"));

        const currentSettings = cloudSettings ? cloudSettings["weather"] : defaultSettings;

        console.log(currentSettings);

        if (container.current === null) {
            return;
        }

        for (const key in currentSettings) {
            let element = container.current.querySelectorAll(`[name="${key}"]`);

            element.forEach(element => {
                switch (element.tagName.toLowerCase()) {
                    case "input":
                        if (element.getAttribute("value") == currentSettings[key]) element.setAttribute("checked", '');

                        break;

                    case "select":
                        let childElement = element.querySelector(`[value="${currentSettings[key]}"]`);
                        childElement.classList.add("current-option");
                        childElement.setAttribute("selected", '');

                        break;

                    default:
                        break;
                };
            });
        }
    }

    function settingsChanger(e) {
        e.preventDefault();

        let weatherSettings = Object.fromEntries(new FormData(weatherSettingsFormRef.current)),
            citySettings = Object.fromEntries(new FormData(citySettingsFormRef.current));

        console.log(weatherSettings);

        if (citySettings["city_API_key"] === '') citySettings["city_API_key"] = defaultSettings["additionta_data"]["city_API_key"];

        let newSettings = { "weather": weatherSettings, "additionta_data": citySettings };

        localStorage.setItem("currentSettings", JSON.stringify(newSettings));

        navigate("/city");
    }

    function setDefaultSettings() {
        localStorage.setItem("currentSettings", JSON.stringify(defaultSettings));
        navigate("/city");
    }

    let component = generalLoading ? <Loading /> : <Content />;

    return (
        <>
            {component}
        </>
    )
}

export default Settings;