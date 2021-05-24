import React from "react";
import AppContext from "../AppContext";
import {Box, ButtonBase, Tooltip} from "@material-ui/core";
import {conditionalClass} from "../util";
import "./ToolButton.scss";

export interface IProps {
	children: React.ReactNode;
	text: string;
	isActive: boolean;
	onClick: (event: React.MouseEvent) => void
}

export interface IState {}

export default class ToolButton extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {}
	static tooltipEnterDelay = 700;

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<Tooltip title={this.props.text} enterDelay={ToolButton.tooltipEnterDelay}>
				<ButtonBase className={`ToolButton ${conditionalClass("Active", this.props.isActive)}`} onClick={this.props.onClick}>
					<Box>
						{this.props.children}
					</Box>
				</ButtonBase>
			</Tooltip>
		)
	}
}
