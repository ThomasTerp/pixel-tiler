import React from "react";
import AppContext from "../AppContext";
import TileManager from "../TileManager";

export interface IProps
{
	tileManager: TileManager;
}

export interface IState {}

export default class GridTiles extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	public static defaultProps = {}

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<g className="GridTiles">
				{this.props.tileManager.placedTiles}
			</g>
		)
	}
}

/*
<g className="Tile" width="32px" height="32px" viewBox="0,0 32,32" style={{transformOrigin: "16px 16px", transform: "translate(0px, 0px) rotate(0deg)"}}>
	<rect width="32px" height="32px" fill="white" />
	<rect className="TilePointer" x="0" y="0" width="32px" height="32px" fill="none" />
</g>
<g className="Tile" width="32px" height="32px" viewBox="0,0 32,32" style={{transformOrigin: "16px 16px", transform: "translate(32px, 0px) rotate(0deg)"}}>
	<rect width="32px" height="32px" fill="white" />
	<rect className="TilePointer" x="0" y="0" width="32px" height="32px" fill="none" />
</g>
<g className="Tile" width="32px" height="32px" viewBox="0,0 32,32" style={{transformOrigin: "16px 16px", transform: "translate(0px, 32px) rotate(0deg)"}}>
	<rect width="32px" height="32px" fill="white" />
	<rect className="TilePointer" x="0" y="0" width="32px" height="32px" fill="none" />
</g>
<g className="Tile" width="32px" height="32px" viewBox="0,0 32,32" style={{transformOrigin: "16px 16px", transform: "translate(32px, 32px) rotate(0deg)"}}>
	<circle cx="16" cy="16" r="16" fill="white" />
	<rect className="TilePointer" x="0" y="0" width="32px" height="32px" fill="none" />
</g>
*/
