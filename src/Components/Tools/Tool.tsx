import React from "react";
import AppContext from "../../AppContext";

export interface IProps {
	name: string;
}

export interface IState {}

export default abstract class Tool<P, S> extends React.Component<P & IProps, IState & S>
{
	public static contextType = AppContext;

	public render(): React.ReactNode
	{
		return (
			<div className="Tool">
				<h1 className="Name" style={{color: this.context.theme.color2}}>
					{this.props.name}
				</h1>
				{this.renderProperties()}
			</div>
		)
	}

	public renderProperties(): React.ReactNode
	{
		return <div className="Properties"></div>;
	}
}
