import React from "react";
import SideMenu from "./SideMenu";
import Grid from "./Grid";
import Tile from "./Tile";
import Tileset from "./Tileset";
//import "./App.scss";

export interface IProps {
	tilesets: {[tilesetID: string]: Tileset};
}

export interface IState {
	selectedTileset: Tileset;
	selectedTile: Tile;
}

export default class App extends React.Component<IProps, IState>
{
	constructor(props: IProps)
	{
		super(props);

		this.state = {
			selectedTileset: props.tilesets["default"],
			selectedTile: props.tilesets["default"].getTile("tile1")
		};
	}

	render(): React.ReactNode
	{
		return (
			<div className="App">
				{this.renderContent()}
				<SideMenu />
			</div>
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
