import React from "react";
import $ from "jquery";
import Palette from "../Palette";
import PaletteManager, {ColorChangeEvent, SelectedColorIDChangeEvent} from "../../PaletteManager";
import TileManager, {SelectedTilesetChangedEvent, SelectedTileTypeChangedEvent} from "../../TileManager";
import GridInfo from "../../GridInfo";
import ToolBox from "./ToolBox";
import {Box, ButtonBase, WithStyles, createStyles, withStyles} from "@material-ui/core";
import TileType from "../../TileType";
import TileData from "../../TileData";
import Vector2D from "../../Vector2D";
import {conditionalClass} from "../../util";

const styles = () => createStyles({
	tileTypes: {
		display: "grid",
		gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
		gridGap: "2px",
		margin: "2px",

		"& > .TileType": {
			boxSizing: "border-box",
			width: "100%",
			padding: "2px",

			"&:hover": {
				backgroundColor: "var(--theme-secondary-dark)"
			},

			"&.Active": {
				backgroundColor: "var(--theme-secondary-main)"
			}
		}
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	name: string;
	icon: React.ReactNode;
	paletteManager: PaletteManager;
	tileManager: TileManager;
	gridInfo: GridInfo;
}

export interface IState {}

class BrushTool extends React.Component<IProps, IState>
{
	private _isDrawing: boolean = false;

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<ToolBox name={this.props.name} icon={this.props.icon}>
				<Palette paletteManager={this.props.paletteManager} />
				<Box className={`${this.props.classes.tileTypes} TileTypes`}>
					{this.renderTileTypes()}
				</Box>
			</ToolBox>
		);
	}

	public renderTileTypes(): React.ReactNode
	{
		return this.props.tileManager.selectedTileset.tileTypes.map((tileType: TileType) => (
			<ButtonBase key={tileType.id} className={`TileType ${conditionalClass("Active", this.props.tileManager.selectedTileType === tileType)}`} onClick={() => this.props.tileManager.selectedTileType = tileType}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1,1">
					{tileType.buildSVG(new TileData(tileType, Vector2D.zero.copy(), 0, 0, this.props.paletteManager.selectedColor, this.props.paletteManager.selectedColorID))}
				</svg>
			</ButtonBase>
		));
	}

	public draw(cursorPosition: Vector2D): number
	{
		const position: Vector2D = cursorPosition.copy()
			.subtract(this.props.gridInfo.offset.copy())
			.subtract(this.props.gridInfo.size.copy().divide(2))
			.divide(this.props.tileManager.size)
			.multiply(this.props.gridInfo.zoom)

		return this.props.tileManager.placeTile(new TileData(this.props.tileManager.selectedTileType, position, this.props.tileManager.size, this.props.tileManager.rotation, this.props.paletteManager.selectedColor, this.props.paletteManager.selectedColorID));
	}

	public componentDidMount(): void
	{
		const $grid = $(".Grid");

		this.props.paletteManager.colorChangeEmitter.on(this._paletteManager_ColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.on(this._paletteManager_SelectedColorIDChangeEmitter_ForceUpdate);
		this.props.tileManager.selectedTilesetChangedEmitter.on(this._tileManager_SelectedTilesetChangedEmitter_ForceUpdate);
		this.props.tileManager.selectedTileTypeChangedEmitter.on(this._tileManager_SelectedTileTypeChangedEmitter_ForceUpdate);
		$grid.on("mousedown", this._grid_MouseDown_StartDrawing);
		$grid.on("mouseup", this._grid_MouseUp_StopDrawing);
		$grid.on("mousemove", this._grid_MouseMove_Draw);
	}

	public componentWillUnmount(): void
	{
		const $grid = $(".Grid");

		this.props.paletteManager.colorChangeEmitter.off(this._paletteManager_ColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.off(this._paletteManager_SelectedColorIDChangeEmitter_ForceUpdate);
		this.props.tileManager.selectedTilesetChangedEmitter.off(this._tileManager_SelectedTilesetChangedEmitter_ForceUpdate);
		this.props.tileManager.selectedTileTypeChangedEmitter.off(this._tileManager_SelectedTileTypeChangedEmitter_ForceUpdate);
		$grid.off("mousedown", this._grid_MouseDown_StartDrawing);
		$grid.off("mouseup", this._grid_MouseUp_StopDrawing);
		$grid.off("mousemove", this._grid_MouseMove_Draw);
	}

	_paletteManager_ColorChangeEmitter_ForceUpdate = (event: ColorChangeEvent) =>
	{
		this.forceUpdate();
	}

	_paletteManager_SelectedColorIDChangeEmitter_ForceUpdate = (event: SelectedColorIDChangeEvent) =>
	{
		this.forceUpdate();
	}

	_tileManager_SelectedTilesetChangedEmitter_ForceUpdate = (event: SelectedTilesetChangedEvent) =>
	{
		this.forceUpdate();
	}

	_tileManager_SelectedTileTypeChangedEmitter_ForceUpdate = (event: SelectedTileTypeChangedEvent) =>
	{
		this.forceUpdate();
	}

	_grid_MouseDown_StartDrawing = (event: JQuery.MouseDownEvent) =>
	{
		if(!this._isDrawing && event.button === 0)
		{
			this._isDrawing = true;
			this.draw(new Vector2D(event.offsetX, event.offsetY));
		}
	}

	_grid_MouseUp_StopDrawing = (event: JQuery.MouseUpEvent) =>
	{
		if(this._isDrawing && event.button === 0)
		{
			this._isDrawing = false;
		}
	}

	_grid_MouseMove_Draw = (event: JQuery.MouseMoveEvent) =>
	{
		if(this._isDrawing)
		{
			this.draw(new Vector2D(event.offsetX, event.offsetY));
		}
	}
}

export default withStyles(styles)(BrushTool);
