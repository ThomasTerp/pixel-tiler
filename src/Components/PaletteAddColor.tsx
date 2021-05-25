import React from "react";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import {Tooltip, Box, WithStyles, createStyles, withStyles} from "@material-ui/core";

const styles = () => createStyles({
	root: {
		position: "relative",
		left: "2px",
		top: "2px",
		width: "calc(100% - 4px)",
		height: "0px",
		padding: "0px",
		paddingTop: "calc(100% - 8px)",
		margin: "0px",
		marginBottom: "4px",
		border: "2px solid",
		cursor: "pointer",
		backgroundColor: "var(--theme-primary-dark)",
		borderColor: "var(--theme-secondary-main)",

		"& div": {
			display: "flex",
			position: "absolute",
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px",
			justifyContent: "center",
			alignItems: "center",
			fontSize: "31px",
			color: "var(--theme-secondary-main)"
		}
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	paletteManager: PaletteManager;
	text: string;
}

export interface IState {}

class PaletteAddColor extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
		text: "Add Color"
	}
	static tooltipEnterDelay = 700;

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<Tooltip title={this.props.text} enterDelay={PaletteAddColor.tooltipEnterDelay}>
				<button className={`${this.props.classes.root} PaletteAddColor`} onClick={this._paletteAddColor_OnClick_AddColor}>
					<Box>
						+
					</Box>
				</button>
			</Tooltip>
		)
	}

	private _paletteAddColor_OnClick_AddColor = (event: React.MouseEvent) =>
	{
		this.props.paletteManager.addColor();
	}

}

export default withStyles(styles)(PaletteAddColor);
