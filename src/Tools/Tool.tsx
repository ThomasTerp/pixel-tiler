import React from "react";

export interface IProps {
	name: string;
}

export interface IState {}

export default abstract class Tool extends React.Component<IProps, IState>
{
	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<div className="Tool">
				<h1 className="Name">
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
