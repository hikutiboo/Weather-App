import "./temperature.css"
import React from 'react'

function Temperature({ view, min, min_app, max, max_app, units = "C" }) {
    let minMaxHeaders = (type) => {
        switch (type) {
            case "default":
                return !isNaN(Number(max));

            case "apperent":
                return !isNaN(Number(max_app));

            default:
                break;
        }
    }

    function doCreateMinMax(to_do) {
        return (
            to_do ? (
                <>
                    <span className="min min-max-header">Min</span>
                    <span className="max min-max-header">Max</span>
                </>
            ) : ''
        );
    }

    function temeratureValue(check, min, max) {
        return check ? (
            <>
                <span className="min-temp temperature-value-text">{min}{units}</span>
                <span className="max-temp temperature-value-text">{max}{units}</span>
            </>
        ) : (
            <p className="temperature-value">
                <span className="min-temp temperature-value-text">{min}{units}</span>
            </p>
        )
    }

    function headerSize(header) {
        return view === "short" ? header[0] : header;
    }

    return (
        <div className="temperature-container">
            <div className="default-temperature temperature">
                <h2 title="Temperature" className="default-temperature-header temperature-header">
                    {headerSize("Temperature")}
                </h2>
                {doCreateMinMax(minMaxHeaders("default"))}
                {temeratureValue(minMaxHeaders("default"), min, max)}
            </div>
            <div className="apperent-temperature temperature">
                <h2 title="Apperent Temperature" className="apperent-temperature-header temperature-header">
                    {headerSize("Apperent Temperature")}
                </h2>
                {doCreateMinMax(minMaxHeaders("apperent"))}
                {temeratureValue(minMaxHeaders("apperent"), min_app, max_app)}
            </div>
        </div>
    )
}

export default Temperature;