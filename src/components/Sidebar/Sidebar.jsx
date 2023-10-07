import "./sidebar.css";
import { Link, NavLink } from "react-router-dom";

function Sidebar({generalLoadingState, lastWatchedList}) {

    const setGeneralLoading = generalLoadingState[1];

    return (
        <div className="sidebar-container">
            <Link onClick={() => {
                setGeneralLoading(true)
            }} to="/" className="main-logo sidebar-icon">
                <p>
                    <i className="fa-solid fa-sun logo-icon icon"></i>
                    <span className="logo-text">
                        <span className="react-text logo-text-item">R</span>
                        <span className="weather-text logo-text-item">W</span>
                    </span>
                </p>
            </Link>

            <NavLink onClick={() => {
                setGeneralLoading(true)
            }} to={"/city/" + lastWatchedList[0]} className="weather-logo sidebar-icon">
                <i className="fa-solid fa-cloud-sun-rain icon"></i>
                <span className="icon-text">Weather</span>
            </NavLink>


            <NavLink onClick={() => {
                setGeneralLoading(true)
            }} to="cities" className="cities-logo sidebar-icon">
                <i className="fa-solid fa-earth-americas icon"></i>
                <span className="icon-text">Cities</span>
            </NavLink>


            <NavLink onClick={() => {
                setGeneralLoading(true)
            }} to="settings" className="settings-logo sidebar-icon">
                <i className="fa-solid fa-sliders icon"></i>
                <span className="icon-text">Settings</span>
            </NavLink>


        </div>
    )
}

export default Sidebar;