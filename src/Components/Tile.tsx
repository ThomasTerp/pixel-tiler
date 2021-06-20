import React from "react";
import AppContext from "../AppContext";
import TileData from "../TileData";

export interface IProps {
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
			transform: `translate(${this.props.tileData.position.x}px, ${this.props.tileData.position.y}px) rotate(${this.props.tileData.rotation * 90}deg)`
		};

		return (
			<g className="Tile" width={`${this.props.tileData.size}px`} height={`${this.props.tileData.size}px`} viewBox={`0,0 ${this.props.tileData.size},${this.props.tileData.size}`} style={style}>
				{this.props.tileData.tileType.buildSVG(this.props.tileData)}
				<rect className="TilePointer" x="0" y="0" width={`${this.props.tileData.size}px`} height={`${this.props.tileData.size}px`} fill="none" />
			</g>
		);
	}
}
