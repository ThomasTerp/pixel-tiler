import React from "react";
import "./ToolButton.scss";

export interface IProps {
	text: string;
	isActive: boolean;
	onClick: (event: React.MouseEvent) => void
}

export interface IState {}

export default class ToolButton extends React.Component<IProps, IState>
{
	public static defaultProps = {}

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<button className={`ToolButton ${this.props.isActive ? "Active" : ""}`} onClick={this.props.onClick}>
				<div>
					{this.props.text}
				</div>
			</button>
		)
	}
}
