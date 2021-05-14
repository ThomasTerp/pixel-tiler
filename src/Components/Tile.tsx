import React from "react";
import AppContext from "../AppContext";
import Vector2D from "../Vector2D";

export interface IProps {
	id: string,
	svg: React.ReactNode;
	position: Vector2D;
	size: number;
	rotation: number;
	color: string;
	colorIndex: number;
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
			transformOrigin: `${this.props.size / 2}px ${this.props.size / 2}px`,
			transform: `translate(${this.props.position.x}px, ${this.props.position.y}px) rotate(${this.props.rotation * 90}deg)`
		};

		return (
			<g className="Tile" width={`${this.props.size}px`} height={`${this.props.size}px`} viewBox={`0,0 ${this.props.size},${this.props.size}`} style={style}>
				{this.props.svg}
				<rect className="TilePointer" x="0" y="0" width={`${this.props.size}px`} height={`${this.props.size}px`} fill="none" />
			</g>
		);
	}
}
