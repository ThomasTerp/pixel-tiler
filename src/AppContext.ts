import React from "react";
import PaletteManager from "./PaletteManager";
import Theme from "./Theme";
import darkTheme from "./Themes/darkTheme";

export interface IAppContext
{
	theme: Theme,
	paletteManager: PaletteManager
}

const AppContext = React.createContext({
	theme: darkTheme,
	paletteManager: new PaletteManager()
});
export default AppContext;
