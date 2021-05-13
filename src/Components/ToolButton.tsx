import React from "react";
import AppContext from "../AppContext";
import "./ToolButton.scss";

export interface IProps {
	children: React.ReactNode;
	isActive: boolean;
	onClick: (event: React.MouseEvent) => void
}

export interface IState {}

export default class ToolButton extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	public static defaultProps = {}

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		const toolButtonStyle: React.CSSProperties = {
			backgroundColor: this.context.theme.color3
		}

		if(this.props.isActive)
		{
			toolButtonStyle.borderColor = this.context.theme.color2;
		}

		return (
			<button className={`ToolButton ${this.props.isActive ? "Active" : ""}`} style={toolButtonStyle} onClick={this.props.onClick}>
				<div style={{color: this.context.theme.color2}}>
					{this.props.children}
				</div>
			</button>
		)
	}
}
