import React from "react";
import AppContext from "../../AppContext";
import {Typography, Box} from "@material-ui/core";
import "./Tool.scss";

export interface IProps {
	name: string;
	icon: React.ReactNode;
}

export interface IState {}

export default abstract class Tool<P, S> extends React.Component<P & IProps, IState & S>
{
	public static contextType = AppContext;

	public render(): React.ReactNode
	{
		return (
			<div className="Tool" style={{backgroundColor: this.context.theme.color3}}>
				<Box mt={1} mb={1}>
					<Typography className="Name" style={{color: this.context.theme.color2}} variant="h5">
						{this.props.name}
					</Typography>
				</Box>
				{this.renderProperties()}
			</div>
		)
	}

	public renderProperties(): React.ReactNode
	{
		return <div className="Properties"></div>;
	}
}
