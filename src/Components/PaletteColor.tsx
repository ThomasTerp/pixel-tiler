import React from "react";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import "./PaletteColor.scss";

export interface IProps {
	paletteManager: PaletteManager;
	colorID: number;
	color: string;
	isSelectable: boolean;
}

export interface IState {}

export default abstract class PaletteColor extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
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
		const paletteColorStyle: React.CSSProperties = {}

		if(this.props.isSelectable && this.isSelected())
		{
			paletteColorStyle.backgroundColor = `${this.context.theme.color2}`;
		}

		return (
			<div className="PaletteColor" style={paletteColorStyle}>
				<input ref={this._inputRef} style={{backgroundColor: this.props.color, borderColor: this.context.theme.color1}} type="color" defaultValue={this.props.color} onChange={this._input_OnChange_SetPaletteColor} onClick={this._input_OnClick_SelectColorID} onDoubleClick={this._input_OnDoubleClick_OpenMenu} onContextMenu={this._input_OnContextMenu_OpenMenu} />
			</div>
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
	}

	private _input_OnDoubleClick_OpenMenu = (event: React.MouseEvent) =>
	{
		if(this.props.isSelectable)
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
