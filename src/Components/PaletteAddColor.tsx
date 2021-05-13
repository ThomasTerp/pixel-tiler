import React from "react";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import "./PaletteAddColor.scss";

export interface IProps {
	paletteManager: PaletteManager;
}

export interface IState {}

export default abstract class PaletteAddColor extends React.Component<IProps, IState>
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
			<button className="PaletteAddColor" style={{backgroundColor: this.context.theme.color3, borderColor: this.context.theme.color2}} onClick={this._paletteAddColor_OnClick_AddColor}>
				<div style={{color: this.context.theme.color2}}>
					+
				</div>
			</button>
		)
	}

	private _paletteAddColor_OnClick_AddColor = (event: React.MouseEvent) =>
	{
		this.props.paletteManager.addColor();
	}

}
