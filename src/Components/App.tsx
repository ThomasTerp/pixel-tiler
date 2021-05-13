import React from "react";
import SideMenu from "./SideMenu";
import Grid from "./Grid";
import Tile from "./Tile";
import Tileset from "../Tileset";
import PaletteManager from "../PaletteManager";
import AppContext, {IAppContext} from "../AppContext";
import ITheme from "../ITheme";

export interface IProps {
	themes: {[themeID: string]: ITheme};
	tilesets: {[tilesetID: string]: Tileset};
	defaultPaletteColors: string[];
}

export interface IState {
	paletteManager: PaletteManager;
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
			paletteManager: new PaletteManager(this.props.defaultPaletteColors),
			selectedTileset: props.tilesets["default"],
			selectedTile: props.tilesets["default"].getTile("tile1")
		};

		this._appContext = {
			theme: this.props.themes.dark
		}
	}

	render(): React.ReactNode
	{
		return (
			<AppContext.Provider value={this._appContext}>
				<div className="App">
					{this.renderContent()}
					<SideMenu paletteManager={this.state.paletteManager} />
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
