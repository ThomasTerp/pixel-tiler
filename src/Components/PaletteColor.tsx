import React from "react";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";

export interface IProps {
	paletteManager: PaletteManager;
	colorID: number;
	color: string;
}

export interface IState {}

export default abstract class PaletteColor extends React.Component<IProps, IState>
{
	static contextType = AppContext;

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<input className="PaletteColor" style={{backgroundColor: this.props.color}} type="color" defaultValue={this.props.color} onChange={this._paletteColor_OnChange_SetPaletteColor} />
		)
	}

	private _paletteColor_OnChange_SetPaletteColor = (event: React.ChangeEvent) =>
	{
		this.props.paletteManager.setColor(this.props.colorID, (event.target as any).value);
	}
}
