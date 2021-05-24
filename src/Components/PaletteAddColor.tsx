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
				<button className="PaletteAddColor" onClick={this._paletteAddColor_OnClick_AddColor}>
					<div>
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
