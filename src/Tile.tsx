import React from "react";
import Vector2D from "./Vector2D";

export interface IProps {
	svg: React.Component;
}

export interface IState {
	position: Vector2D;
	size: number;
	rotation: number;
	color: string;
}

export default class Tile extends React.Component<IProps, IState>
{
	constructor(props: IProps)
	{
		super(props);

		this.state = {
			position: new Vector2D(0, 0),
			size: 16,
			rotation: 0,
			color: "#FFFFFF"
		}
	}

	render()
	{
		const style = {
			"transform-origin": `${this.state.size / 2}px ${this.state.size / 2}px`,
			"transform": `translate(${this.state.position.x}px, ${this.state.position.y}px) rotate(${this.state.rotation * 90}deg)`
		};

		return (
			<g className="Tile" width={`${this.state.size}px`} height={`${this.state.size}px`} viewBox={`0,0 ${this.state.size},${this.state.size}`} style={style}>
				{this.props.svg}
				<rect className="TilePointer" x="0" y="0" width={`${this.state.size}px`} height={`${this.state.size}px`} fill="none" />
			</g>
		);
	}
}
