import React from "react";
import PaletteColor from "./PaletteColor";
import PaletteAddColor from "./PaletteAddColor";
import AppContext from "../AppContext";
import {Box, WithStyles, createStyles, withStyles} from "@material-ui/core";
import PaletteManager, {ColorChangeEvent, SelectedColorIDChangeEvent} from "../PaletteManager";

const styles = () => createStyles({
	root: {
		display: "grid",
		gridTemplateColumns: "repeat(6, auto)",
		gap: "0px",
		margin: "2px"
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	paletteManager: PaletteManager;
	isEditable: boolean;
	isSelectable: boolean;
}

export interface IState {}

class Palette extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
		isEditable: true,
		isSelectable: true
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<Box className={`${this.props.classes.root} Palette`}>
				{this.props.paletteManager.colors.map((color: string, colorID: number) => <PaletteColor key={colorID} paletteManager={this.props.paletteManager} colorID={colorID} color={color} isEditable={this.props.isEditable} isSelectable={this.props.isSelectable} />)}
				{this.props.isEditable ? <PaletteAddColor paletteManager={this.props.paletteManager} /> : null}
			</Box>
		)
	}

	public componentDidMount(): void
	{
		this.props.paletteManager.colorChangeEmitter.onPost(this._paletteManager_PostColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.onPost(this._paletteManager_PostSelectedColorIDChangeEmitter_ForceUpdate);
	}

	public componentWillUnmount(): void
	{
		this.props.paletteManager.colorChangeEmitter.offPost(this._paletteManager_PostColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.offPost(this._paletteManager_PostSelectedColorIDChangeEmitter_ForceUpdate);
	}

	_paletteManager_PostColorChangeEmitter_ForceUpdate = (event: ColorChangeEvent) =>
	{
		this.forceUpdate();
	}

	_paletteManager_PostSelectedColorIDChangeEmitter_ForceUpdate = (event: SelectedColorIDChangeEvent) =>
	{
		this.forceUpdate();
	}
}

export default withStyles(styles)(Palette);
