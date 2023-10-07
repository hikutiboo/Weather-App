import React from "react";

let weathercodes_db = {
	0: {
		day: <i className="fa-regular fa-sun sun-icon icon"></i>,
		night: <i className="fa-regular fa-moon moon-icon icon"></i>
	},
	1: {
		day: <i className="fa-solid fa-cloud-sun cloud-sun-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-moon cloud-moon-icon icon"></i>
	},
	2: {
		day: <i className="fa-solid fa-cloud-sun cloud-sun-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-moon cloud-moon-icon icon"></i>
	},
	3: {
		day: <i className="fa-solid fa-cloud cloud-icon icon"></i>,
		night: <i className="fa-solid fa-cloud cloud-icon icon"></i>
	},
	45: {
		day: <i className="fa-solid fa-smog smog-icon icon"></i>,
		night: <i className="fa-solid fa-smog smog-icon icon"></i>
	},
	48: {
		day: <i className="fa-solid fa-smog smog-icon icon"></i>,
		night: <i className="fa-solid fa-smog smog-icon icon"></i>
	},
	51: {
		day: <i className="fa-solid fa-droplet droplet-icon icon"></i>,
		night: <i className="fa-solid fa-droplet droplet-icon icon"></i>
	},
	53: {
		day: <i className="fa-solid fa-droplet droplet-icon icon"></i>,
		night: <i className="fa-solid fa-droplet droplet-icon icon"></i>
	},
	55: {
		day: <><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-droplet droplet-icon icon"></i></>,
		night: <><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-droplet droplet-icon icon"></i></>
	},
	56: {
		day: <><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-snowflake snowflake-icon icon"></i></>,
		night: <><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-snowflake snowflake-icon icon"></i></>
	},
	57: {
		day: <><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-snowflake snowflake-icon icon"></i></>,
		night: <><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-droplet droplet-icon icon"></i><i className="fa-solid fa-snowflake snowflake-icon icon"></i></>
	},
	61: {
		day: <i className="fa-solid fa-cloud-rain cloud-rain-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-rain cloud-rain-icon icon"></i>
	},
	63: {
		day: <i className="fa-solid fa-cloud-sun-rain cloud-sun-rain-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-moon-rain cloud-moon-rain-icon icon"></i>
	},
	65: {
		day: <i className="fa-solid fa-cloud-sun-rain cloud-sun-rain-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-moon-rain cloud-moon-rain-icon icon"></i>
	},
	66: {
		day: <i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i>
	},
	67: {
		day: <i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i>
	},
	71: {
		day: <i className="fa-solid fa-snowflake snowflake-icon icon" ></i>,
		night: <i className="fa-solid fa-snowflake snowflake-icon icon" ></i>
	},
	73: {
		day: <i className="fa-solid fa-snowflake snowflake-icon icon" ></i>,
		night: <i className="fa-solid fa-snowflake snowflake-icon icon" ></i>
	},
	75: {
		day: <i className="fa-solid fa-snowflake snowflake-icon icon" ></i>,
		night: <i className="fa-solid fa-snowflake snowflake-icon icon" ></i>
	},
	77: {
		day: <><i className="fa-solid fa-snowflake snowflake-icon icon" ></i><i className="fa-solid fa-snowflake snowflake-icon icon" ></i></>,
		night: <><i className="fa-solid fa-snowflake snowflake-icon icon" ></i><i className="fa-solid fa-snowflake snowflake-icon icon" ></i></>
	},
	80: {
		day: <i className="fa-solid fa-cloud-sun-rain cloud-sun-rain-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-sun-rain cloud-sun-rain-icon icon"></i>
	},
	81: {
		day: <i className="fa-solid fa-cloud-sun-rain cloud-sun-rain-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-sun-rain cloud-sun-rain-icon icon"></i>
	},
	82: {
		day: <><i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i><i className="fa-solid fa-plus"></i></>,
		night: <><i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i><i className="fa-solid fa-plus"></i></>
	},
	85: {
		day: <i className="fa-solid fa-snowflake snowflake-icon icon"></i>,
		night: <i className="fa-solid fa-snowflake snowflake-icon icon"></i>
	},
	86: {
		day: <><i className="fa-solid fa-snowflake snowflake-icon icon"></i><i className="fa-solid fa-plus"></i></>,
		night: <><i className="fa-solid fa-snowflake snowflake-icon icon"></i><i className="fa-solid fa-plus"></i></>
	},
	95: {
		day: <i className="fa-solid fa-cloud-bolt cloud-bolt-icon icon"></i>,
		night: <i className="fa-solid fa-cloud-bolt cloud-bolt-icon icon"></i>
	},
	96: {
		day: <><i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i><i className="fa-solid fa-bolt bolt-icon icon"></i></>,
		night: <><i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i><i className="fa-solid fa-bolt bolt-icon icon"></i></>
	},
	99: {
		day: <><i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i><i className="fa-solid fa-bolt bolt-icon icon"></i><i className="fa-solid fa-plus plus-icon icon"></i></>,
		night: <><i className="fa-solid fa-cloud-showers-heavy cloud-showers-heavy-icon icon"></i><i className="fa-solid fa-bolt bolt-icon icon"></i><i className="fa-solid fa-plus plus-icon icon"></i></>
	}
}

export default weathercodes_db;