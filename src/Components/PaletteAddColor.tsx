import React from "react";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import {Tooltip} from "@material-ui/core";
import "./PaletteAddColor.scss";

export interface IProps {
	paletteManager: PaletteManager;
	text: string;
}

export interface IState {}

export default abstract class PaletteAddColor extends React.Component<IProps, IState>
{
	public static contextType = AppContext;
	public static defaultProps = {
		text: "Add Color"
	}

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<Tooltip title={this.props.text}>
				<button className="PaletteAddColor" style={{backgroundColor: this.context.theme.color3, borderColor: this.context.theme.color2}} onClick={this._paletteAddColor_OnClick_AddColor}>
					<div style={{color: this.context.theme.color2}}>
						+
					</div>
				</button>
			</Tooltip>
		)
	}

	private _paletteAddColor_OnClick_AddColor = (event: React.MouseEvent) =>
	{
		this.props.paletteManager.addColor();
	}

}
