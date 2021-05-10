import React from "react";
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
	grid: React.RefObject<Grid>;

	constructor(props: IProps)
	{
		super(props);

		this.state = {
			selectedTileset: props.tilesets["default"],
			selectedTile: props.tilesets["default"].getTile("tile1")
		};

		this.grid = React.createRef();
	}

	render(): React.ReactNode
	{
		return (
			<div className="App">
				<div className="Content">
					<Grid ref={this.grid} />
				</div>
				<div className="SidePanel">
					<div className="Tools"></div>
					<div className="ToolProperties"></div>
				</div>
			</div>
		);
	}
}
