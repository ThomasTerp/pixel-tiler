import React from "react";
import Slider from "@material-ui/core/Slider";
import ToolBox from "./ToolBox";

export interface IProps
{
	name: string;
	icon: React.ReactNode;
}

export interface IState {}

export default class SettingsTool extends React.Component<IProps, IState>
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
				<Slider />
			</ToolBox>
		);
	}
}
