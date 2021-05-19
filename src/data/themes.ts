import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

let theme = createMuiTheme({
	palette: {
		type: "light"
	}
}/*{
	palette: {
		primary: {
			main: "#79c0ff",
			dark: "#1f2f46"
		},
		background: {
			default: "#1a212d"
		},
		text: {
			primary: "#79c0ff"
		}
	}
}*/);
theme = responsiveFontSizes(theme);
export default theme;
