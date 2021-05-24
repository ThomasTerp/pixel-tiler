import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";
import {PaletteType} from "@material-ui/core";

function createTheme(type: PaletteType, primaryColor: string, secondaryColor: string)
{
	let theme = createMuiTheme({
		palette: {
			type: type,
			primary: {
				main: primaryColor
			},
			secondary: {
				main: secondaryColor
			},
			text: {
				primary: secondaryColor,
				secondary: primaryColor
			}
		}
	});
	theme = responsiveFontSizes(theme);

	return theme;
}

export default createTheme("dark", "#1f2f46", "#79c0ff");
