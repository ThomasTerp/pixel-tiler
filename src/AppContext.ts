import React from "react";
import Theme from "./ITheme";
import themes from "./data/themes";

export interface IAppContext
{
	theme: Theme
}

const AppContext = React.createContext({
	theme: themes.dark
});
export default AppContext;
