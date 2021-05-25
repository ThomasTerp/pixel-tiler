import React from "react";
import AppContext from "../AppContext";
import {Box, ButtonBase, Tooltip, createStyles, withStyles, WithStyles} from "@material-ui/core";
import {conditionalClass} from "../util";

const styles = () => createStyles({
	root: {
		paddingTop: "100% !important",

		"&.Active": {
			border: "2px solid",
			borderColor: "var(--theme-secondary-main)",

			"&:hover": {
				borderColor: "var(--theme-secondary-main)",
			}
		},

		"&:hover": {
			border: "2px solid var(--theme-secondary-dark)",
		},

		"& div": {
			display: "flex",
			position: "absolute",
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "var(--theme-primary-main)",

			"&:hover": {
				backgroundColor: "var(--theme-primary-dark)"
			}
		}
	}
});

export interface IProps extends WithStyles<typeof styles> {
	children: React.ReactNode;
	text: string;
	isActive: boolean;
	onClick: (event: React.MouseEvent) => void
}

export interface IState {}

class ToolButton extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	/*static propTypes = {
		classes: PropTypes.object.isRequired
	}*/
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
				<ButtonBase className={`${this.props.classes.root} ToolButton ${conditionalClass("Active", this.props.isActive)}`} onClick={this.props.onClick}>
					<Box>
						{this.props.children}
					</Box>
				</ButtonBase>
			</Tooltip>
		)
	}
}

export default withStyles(styles)(ToolButton);
