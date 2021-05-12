import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import Tileset from "./Tileset";

const tilesets = {
	default: new Tileset("default")
};

const defaultPaletteColors = [
	"#ffffff",
	"#cccccc",
	"#000000",
	"#333333",
	"#925c3a",
	"#784f35",
	"#dc6d1c",
	"#f4dd42",
	"#b23434",
	"#631d1d",
	"#81b93b",
	"#4d893a",
	"#5e81ca",
	"#343d65",
	"#cc00ff",
	"#8f00b3",
	"#ffb3ff"
];

ReactDOM.render(
	(
		<React.StrictMode>
			<App tilesets={tilesets} defaultPaletteColors={defaultPaletteColors} />
		</React.StrictMode>
	),
	document.getElementById("root")
);

reportWebVitals();
