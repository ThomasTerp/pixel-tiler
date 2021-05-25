import React from "react";
import Palette from "../Palette";
import PaletteManager from "../../PaletteManager";
import TileManager from "../../TileManager";
import {TileRenderer} from "../../Tileset";
import ToolBox from "./ToolBox";
import {Box} from "@material-ui/core";

export interface IProps
{
	name: string;
	icon: React.ReactNode;
	paletteManager: PaletteManager;
	tileManager: TileManager;
}

export interface IState
{
	selectedTilesetID: number;
}

export default class BrushTool extends React.Component<IProps, IState>
{
	public constructor(props: IProps)
	{
		super(props);

		this.state = {
			selectedTilesetID: 0
		};
	}

	public render(): React.ReactNode
	{
		return (
			<ToolBox name={this.props.name} icon={this.props.icon}>
				<Palette paletteManager={this.props.paletteManager} />
				<Box>
					{this.props.tileManager.tilesets[this.state.selectedTilesetID].tiles.map((tile: TileRenderer, tileIndex: number) => <svg key={tileIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1,1">{tile.renderTile(this.props.paletteManager.selectedColor)}</svg>)}
				</Box>
			</ToolBox>
		);
	}
}
