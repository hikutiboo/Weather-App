import "./error.css";
import React from 'react';
import errorImage from "./error.png";
import { Link } from "react-router-dom";

function Error({ error, lastCity }) {

    let errorLink =
        error === "Invalid API Key" || error === "Timezone is required" ?
            ["/settings", "Manage settings"] :
            ["/city", "Back to last city"];

    return (
        <div className="no-succsess-container error-container">
            <img className="error-image" src={errorImage} alt="error preview" />
            <p className="error-message">{error}</p>
            <Link to={errorLink[0]}>{errorLink[1]}</Link>
        </div>
    )
}

export default Error;