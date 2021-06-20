import React from "react";
import Palette from "../Palette";
import PaletteManager, {ColorChangeEvent, SelectedColorIDChangeEvent} from "../../PaletteManager";
import TileManager from "../../TileManager";
import ToolBox from "./ToolBox";
import {Box} from "@material-ui/core";
import TileType from "../../TileType";
import TileData from "../../TileData";
import Vector2D from "../../Vector2D";

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
					{this.props.tileManager.tilesets[this.state.selectedTilesetID].tileTypes.map((tileType: TileType) => <svg key={tileType.id} xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1,1">{tileType.buildSVG(new TileData(tileType, Vector2D.zero, 0, 0, this.props.paletteManager.selectedColor, this.props.paletteManager.selectedColorID))}</svg>)}
				</Box>
			</ToolBox>
		);
	}

	public componentDidMount(): void
	{
		this.props.paletteManager.colorChangeEmitter.on(this._paletteManager_ColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.on(this._paletteManager_SelectedColorIDChangeEmitter_ForceUpdate);
	}

	public componentWillUnmount(): void
	{
		this.props.paletteManager.colorChangeEmitter.off(this._paletteManager_ColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.off(this._paletteManager_SelectedColorIDChangeEmitter_ForceUpdate);
	}

	_paletteManager_ColorChangeEmitter_ForceUpdate = (event: ColorChangeEvent) =>
	{
		this.forceUpdate();
	}

	_paletteManager_SelectedColorIDChangeEmitter_ForceUpdate = (event: SelectedColorIDChangeEvent) =>
	{
		this.forceUpdate();
	}
}
