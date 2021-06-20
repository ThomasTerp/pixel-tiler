import React from "react";
import $ from "jquery";
import SideMenu from "./SideMenu";
import Grid from "./Grid";
import Tileset from "../Tileset";
import PaletteManager from "../PaletteManager";
import AppContext, {IAppContext} from "../AppContext";
import {ThemeProvider} from "@material-ui/styles";
import {Box, Theme, WithStyles, createStyles, withStyles} from "@material-ui/core";
import TileManager from "../TileManager";

const styles = () => createStyles({
	root: {
		userSelect: "none"
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	theme: Theme;
	tilesets: Tileset[];
	defaultPaletteColors: string[];
}

export interface IState
{
	paletteManager: PaletteManager;
	tileManager: TileManager;
}

class App extends React.Component<IProps, IState>
{
	private _appContext: IAppContext;

	constructor(props: IProps)
	{
		super(props);

		this.state = {
			paletteManager: new PaletteManager(this.props.defaultPaletteColors),
			tileManager: new TileManager(this.props.tilesets)
		};

		this._appContext = {
			theme: this.props.theme
		}
	}

	render(): React.ReactNode
	{
		return (
			<AppContext.Provider value={this._appContext}>
				<ThemeProvider theme={this.props.theme}>
					<Box className={`${this.props.classes.root} App`}>
						{this.renderContent()}
						<SideMenu paletteManager={this.state.paletteManager} tileManager={this.state.tileManager} />
					</Box>
				</ThemeProvider>
			</AppContext.Provider>
		);
	}

	renderContent(): React.ReactNode
	{
		return (
			<Box className="Content">
				<Grid tileManager={this.state.tileManager} />
			</Box>
		);
	}

	componentDidMount()
	{
		$(document.documentElement).css({
			"--theme-primary-main": this.props.theme.palette.primary.main,
			"--theme-primary-light": this.props.theme.palette.primary.light,
			"--theme-primary-dark": this.props.theme.palette.primary.dark,
			"--theme-secondary-main": this.props.theme.palette.secondary.main,
			"--theme-secondary-light": this.props.theme.palette.secondary.light,
			"--theme-secondary-dark": this.props.theme.palette.secondary.dark,
			"--theme-text-primary": this.props.theme.palette.text.primary,
			"--theme-text-secondary": this.props.theme.palette.text.secondary
		});
	}
}

export default withStyles(styles)(App);
