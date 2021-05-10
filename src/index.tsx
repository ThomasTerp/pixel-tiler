import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import Tileset from "./Tileset";

ReactDOM.render(
	(
		<React.StrictMode>
			<App tilesets={{default: new Tileset("default")}} />
		</React.StrictMode>
	),
	document.getElementById("root")
);

reportWebVitals();
