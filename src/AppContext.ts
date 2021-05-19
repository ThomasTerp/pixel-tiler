import React from "react";
import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export interface IAppContext
{
	theme: Theme
}

const AppContext = React.createContext<IAppContext>({
	theme: theme
});
export default AppContext;
