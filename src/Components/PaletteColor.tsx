import React from "react";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import {Box, WithStyles, createStyles, withStyles} from "@material-ui/core";
import {conditionalClass} from "../util";

const styles = () => createStyles({
	root: {
		width: "100%",
		height: "calc(100% - 4px)",
		padding: "2px 0px 0px 0px",
		margin: "0px",

		"&.Selectable": {
			"&.Active": {
				backgroundColor: "var(--theme-secondary-main)",
			},

			"& input": {
				cursor: "pointer",
			}
		},

		"&.Editable > input": {
			cursor: "pointer",
		},

		"& input": {
			width: "calc(100% - 8px)",
			height: "0px",
			margin: "0px",
			padding: "calc(100% - 8px) 0px 0px 0px",
			cursor: "initial",
			border: "2px solid var(--theme-primary-dark)"
		}
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	paletteManager: PaletteManager;
	colorID: number;
	color: string;
	isEditable: boolean;
	isSelectable: boolean;
}

export interface IState {}

class PaletteColor extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
		isEditable: true,
		isSelectable: true
	};

	private _inputRef: React.RefObject<HTMLInputElement>;
	private _allowClick: boolean = false;

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};

		this._inputRef = React.createRef();
	}

	public render(): React.ReactNode
	{
		return (
			<Box className={`${this.props.classes.root} PaletteColor ${conditionalClass("Selectable", this.props.isSelectable)} ${conditionalClass("Editable", this.props.isEditable)} ${conditionalClass("Active", this.isSelected())}`}>
				<input ref={this._inputRef} style={{backgroundColor: this.props.color}} type="color" defaultValue={this.props.color} onChange={this._input_OnChange_SetPaletteColor} onClick={this._input_OnClick_SelectColorID} onDoubleClick={this._input_OnDoubleClick_OpenMenu} onContextMenu={this._input_OnContextMenu_OpenMenu} />
			</Box>
		)
	}

	private _input_OnChange_SetPaletteColor = (event: React.ChangeEvent) =>
	{
		this.props.paletteManager.setColor(this.props.colorID, (event.target as any).value);
	}

	private _input_OnClick_SelectColorID = (event: React.MouseEvent) =>
	{
		if(this.props.isSelectable)
		{
			this.props.paletteManager.selectedColorID = this.props.colorID;

			if(this._allowClick)
			{
				this._allowClick = false;
			}
			else
			{
				event.preventDefault();
			}
		}

		if(!this.props.isEditable)
		{
			event.preventDefault();
			event.preventDefault();
		}
	}

	private _input_OnDoubleClick_OpenMenu = (event: React.MouseEvent) =>
	{
		if(this.props.isEditable && this.props.isSelectable)
		{
			this._allowClick = true;
			this._inputRef.current?.click();
		}
	}

	private _input_OnContextMenu_OpenMenu = (event: React.MouseEvent) =>
	{
		if(this.props.isSelectable)
		{
			this._allowClick = true;
		}

		this._inputRef.current?.click();

		event.preventDefault();
	}

	private isSelected(): boolean
	{
		return this.props.paletteManager.selectedColorID === this.props.colorID;
	}
}

export default withStyles(styles)(PaletteColor);
