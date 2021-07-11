import React from "react";
import Palette from "../Palette";
import PaletteManager, {ColorChangeEvent, SelectedColorIDChangeEvent} from "../../PaletteManager";
import TileManager from "../../TileManager";
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
}

export interface IState {}

class BrushTool extends React.Component<IProps, IState>
{
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
			<ButtonBase key={tileType.id} className={`TileType ${conditionalClass("Active", this.props.tileManager.selectedTileType === tileType)}`}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1,1">
					{tileType.buildSVG(new TileData(tileType, Vector2D.zero, 0, 0, this.props.paletteManager.selectedColor, this.props.paletteManager.selectedColorID))}
				</svg>
			</ButtonBase>
		));
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

export default withStyles(styles)(BrushTool);
