import React from "react";
import PaletteColor from "./PaletteColor";
import AppContext from "../AppContext";

export interface IProps {
	isSelectable: boolean;
}

export interface IState {}

export default abstract class Palette extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
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
			<div className="Palette">
				{this.context.paletteManager.colors.map((color: string, colorID: number) => <PaletteColor key={colorID} colorID={colorID} color={color} />)}
			</div>
		)
	}
}
