import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import theme from "./data/themes";
import tilesets from "./data/tilesets";
import defaultPaletteColors from "./data/defaultPaletteColors";
import "./index.scss";
import "@fontsource/roboto";

ReactDOM.render(
	(
		<React.StrictMode>
			<App theme={theme} tilesets={tilesets} defaultPaletteColors={defaultPaletteColors} />
		</React.StrictMode>
	),
	document.getElementById("root")
);

reportWebVitals();
