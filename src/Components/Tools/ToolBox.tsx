import React from "react";
import AppContext from "../../AppContext";
import {Typography, Box, WithStyles, createStyles, withStyles} from "@material-ui/core";

const styles = () => createStyles({
	root: {
		height: "100%",
		margin: "0px 4px 0px 4px",
		overflow: "auto"
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	children: React.ReactNode;
	name: string;
	icon: React.ReactNode;
}

export interface IState {}

export class ToolBox extends React.Component<IProps, IState>
{
	public static contextType = AppContext;

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<Box className={`${this.props.classes.root} Tool`} bgcolor="primary.main">
				<Box mt={1} mb={1}>
					<Typography className="Name" color="textPrimary" variant="h5">
						{this.props.name}
					</Typography>
				</Box>
				<Box className="Properties">
					{this.props.children}
				</Box>
			</Box>
		)
	}
}

export default withStyles(styles)(ToolBox);
