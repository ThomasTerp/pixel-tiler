import React from "react";
import AppContext from "../AppContext";
import TileData from "../TileData";

export interface IProps {
	className?: string;
	tileData: TileData;
}

export interface IState {}

export default class Tile extends React.Component<IProps, IState>
{
	static contextType = AppContext;

	constructor(props: IProps)
	{
		super(props);

		this.state = {}
	}

	render(): React.ReactNode
	{
		const style = {
			transformOrigin: `${this.props.tileData.size / 2}px ${this.props.tileData.size / 2}px`,
			transform: `rotate(${this.props.tileData.rotation * 90}deg)`
		};

		return (
			<svg className={`Tile ${this.props.className ?? ""}`} x={this.props.tileData.position.x * this.props.tileData.size} y={this.props.tileData.position.y * this.props.tileData.size} width={this.props.tileData.size} height={this.props.tileData.size} viewBox={`0,0 1,1`} style={style}>
				{this.props.tileData.tileType.buildSVG(this.props.tileData)}
				<rect className="TilePointer" x={0} y={0} width={1} height={1} fill="none" />
			</svg>
		);
	}
}
