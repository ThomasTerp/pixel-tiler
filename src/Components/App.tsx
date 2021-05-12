import React from "react";
import SideMenu from "./SideMenu";
import Grid from "./Grid";
import Tile from "./Tile";
import Tileset from "../Tileset";
import PaletteManager from "../PaletteManager";
import AppContext, {IAppContext} from "../AppContext";
import darkTheme from "../Themes/darkTheme";
import whiteTheme from "../Themes/whiteTheme";

export interface IProps {
	tilesets: {[tilesetID: string]: Tileset};
	defaultPaletteColors: Array<string>;
}

export interface IState {
	selectedTileset: Tileset;
	selectedTile: Tile;
}

export default class App extends React.Component<IProps, IState>
{
	private _appContext: IAppContext;

	constructor(props: IProps)
	{
		super(props);

		this.state = {
			selectedTileset: props.tilesets["default"],
			selectedTile: props.tilesets["default"].getTile("tile1")
		};

		this._appContext = {
			theme: darkTheme,
			paletteManager: new PaletteManager(this.props.defaultPaletteColors)
		}
	}

	render(): React.ReactNode
	{
		return (
			<AppContext.Provider value={this._appContext}>
				<div className="App">
					{this.renderContent()}
					<SideMenu />
				</div>
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
