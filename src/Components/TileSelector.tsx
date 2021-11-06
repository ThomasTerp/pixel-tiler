import React from "react";
import AppContext from "../AppContext";
import TileManager from "../TileManager";


export interface IProps {
	tileManager: TileManager;
}

export interface IState {}

export default abstract class TileSelector extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
		isEditable: true,
		isSelectable: true
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<div className="TileSelector">

			</div>
		)
	}
}
