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

	public cursorToGridPosition(cursorPosition: Vector2D): Vector2D
	{
		return cursorPosition.copy()
			.subtract(this.props.gridInfo.size.copy().divide(2))
			.multiply(this.props.gridInfo.zoom)
			.subtract(this.props.gridInfo.offset.copy())
			.mapAxes((axis: number) => Math.floor(axis / this.props.tileManager.size) * this.props.tileManager.size)
			.divide(this.props.tileManager.size);
	}

	public buildTileData(cursorPosition: Vector2D): TileData
	{
		return new TileData(this.props.tileManager.selectedTileType, this.cursorToGridPosition(cursorPosition), this.props.tileManager.size, this.props.tileManager.rotation, this.props.paletteManager.selectedColor, this.props.paletteManager.selectedColorID)
	}

	public draw(cursorPosition: Vector2D): number
	{
		return this.props.tileManager.placeTile(this.buildTileData(cursorPosition));
	}

	public componentDidMount(): void
	{
		const $grid = $(".Grid");

		this.props.paletteManager.colorChangeEmitter.onPost(this._paletteManager_PostColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.onPost(this._paletteManager_PostSelectedColorIDChangeEmitter_ForceUpdate);
		this.props.tileManager.selectedTilesetChangedEmitter.onPost(this._tileManager_PostSelectedTilesetChangedEmitter_ForceUpdate);
		this.props.tileManager.selectedTileTypeChangedEmitter.onPost(this._tileManager_PostSelectedTileTypeChangedEmitter_ForceUpdate);
		$grid.on("mousedown", this._grid_MouseDown_StartDrawing);
		$grid.on("mouseup", this._grid_MouseUp_StopDrawing);
		$grid.on("mousemove", this._grid_MouseMove_Draw);
		$grid.on("mousemove", this._grid_MouseMove_UpdateGhost);
		$grid.on("mouseleave", this._grid_MouseLeave_RemoveGhost);
	}

	public componentWillUnmount(): void
	{
		const $grid = $(".Grid");

		this.props.paletteManager.colorChangeEmitter.offPost(this._paletteManager_PostColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.offPost(this._paletteManager_PostSelectedColorIDChangeEmitter_ForceUpdate);
		this.props.tileManager.selectedTilesetChangedEmitter.offPost(this._tileManager_PostSelectedTilesetChangedEmitter_ForceUpdate);
		this.props.tileManager.selectedTileTypeChangedEmitter.offPost(this._tileManager_PostSelectedTileTypeChangedEmitter_ForceUpdate);
		$grid.off("mousedown", this._grid_MouseDown_StartDrawing);
		$grid.off("mouseup", this._grid_MouseUp_StopDrawing);
		$grid.off("mousemove", this._grid_MouseMove_Draw);
		$grid.off("mousemove", this._grid_MouseMove_UpdateGhost);
		$grid.off("mouseleave", this._grid_MouseLeave_RemoveGhost);
	}

	_paletteManager_PostColorChangeEmitter_ForceUpdate = (event: ColorChangeEvent) =>
	{
		this.forceUpdate();
	}

	_paletteManager_PostSelectedColorIDChangeEmitter_ForceUpdate = (event: SelectedColorIDChangeEvent) =>
	{
		this.forceUpdate();
	}

	_tileManager_PostSelectedTilesetChangedEmitter_ForceUpdate = (event: SelectedTilesetChangedEvent) =>
	{
		this.forceUpdate();
	}

	_tileManager_PostSelectedTileTypeChangedEmitter_ForceUpdate = (event: SelectedTileTypeChangedEvent) =>
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

	_grid_MouseMove_UpdateGhost = (event: JQuery.MouseMoveEvent) =>
	{
		if(this.props.tileManager.ghostTile == null || this.props.tileManager.ghostTile.tileType !== this.props.tileManager.selectedTileType)
		{
			this.props.tileManager.ghostTile = this.buildTileData(new Vector2D(event.offsetX, event.offsetY));
		}
		else
		{
			const ghostTile = this.props.tileManager.ghostTile;
			ghostTile.position = this.cursorToGridPosition(new Vector2D(event.offsetX, event.offsetY));
			ghostTile.colorID = this.props.paletteManager.selectedColorID;
			ghostTile.color = this.props.paletteManager.selectedColor;
			ghostTile.rotation = this.props.tileManager.rotation;
			ghostTile.size = this.props.gridInfo.gridSize;

			this.props.tileManager.ghostTile = ghostTile;
		}
	}

	_grid_MouseLeave_RemoveGhost = (event: JQuery.MouseLeaveEvent) =>
	{
		this.props.tileManager.ghostTile = undefined;
	}
}

export default withStyles(styles)(BrushTool);
