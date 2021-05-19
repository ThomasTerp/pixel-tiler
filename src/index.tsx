import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import themes from "./data/themes";
import tilesets from "./data/tilesets";
import defaultPaletteColors from "./data/defaultPaletteColors";
import "./index.scss";
import "@fontsource/roboto";

ReactDOM.render(
	(
			<App themes={themes} tilesets={tilesets} defaultPaletteColors={defaultPaletteColors} />
	),
	document.getElementById("root")
);

reportWebVitals();
