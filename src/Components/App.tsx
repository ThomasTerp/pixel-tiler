import React from "react";
import SideMenu from "./SideMenu";
import Grid from "./Grid";
import Tileset from "../Tileset";
import PaletteManager from "../PaletteManager";
import AppContext, {IAppContext} from "../AppContext";
import {ThemeProvider} from "@material-ui/styles";
import {Theme} from "@material-ui/core";
import TileManager from "../TileManager";
import "./App.scss";

export interface IProps {
	theme: Theme;
	tilesets: Tileset[];
	defaultPaletteColors: string[];
}

export interface IState {
	paletteManager: PaletteManager;
	tileManager: TileManager;
}

export default class App extends React.Component<IProps, IState>
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
					<div className="App">
						{this.renderContent()}
						<SideMenu paletteManager={this.state.paletteManager} tileManager={this.state.tileManager} />
					</div>
				</ThemeProvider>
			</AppContext.Provider>
		);
	}

	renderContent(): React.ReactNode
	{
		return (
			<div className="Content">
				<Grid />
			</div>
		);
	}
}
