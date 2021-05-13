import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import themes from "./data/themes";
import tilesets from "./data/tilesets";
import defaultPaletteColors from "./data/defaultPaletteColors";

ReactDOM.render(
	(
		<React.StrictMode>
			<App themes={themes} tilesets={tilesets} defaultPaletteColors={defaultPaletteColors} />
		</React.StrictMode>
	),
	document.getElementById("root")
);

reportWebVitals();
