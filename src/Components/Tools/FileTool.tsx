import React from "react";
import Palette from "../Palette";
import PaletteManager from "../../PaletteManager";
import ToolBox from "./ToolBox";

export interface IProps
{
	name: string;
	icon: React.ReactNode;
	paletteManager: PaletteManager;
}

export interface IState {}

export default class FileTool extends React.Component<IProps, IState>
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
				<Palette paletteManager={this.props.paletteManager} isEditable={true} isSelectable={false} />
			</ToolBox>
		);
	}
}
