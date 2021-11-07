import React from "react";
import AppContext from "../AppContext";
import TileManager, {GhostTileChangedEvent} from "../TileManager";
import Tile from "./Tile"
import {createStyles, withStyles, WithStyles} from "@material-ui/core";

const styles = () => createStyles({
	ghostTile: {
		pointerEvents: "none"
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	tileManager: TileManager;
}

export interface IState {}

class GridTiles extends React.Component<IProps, IState>
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
			<React.Fragment>
				<g className="GridTiles">
					{this.props.tileManager.placedTiles.map((tileData, tileDataID) => <Tile key={tileDataID} tileData={tileData} />)}
				</g>
				<g className="GhostTiles">
					{this.props.tileManager.ghostTile == null ? null : <Tile className={`GhostTile ${this.props.classes.ghostTile}`} tileData={this.props.tileManager.ghostTile} />}
				</g>
			</React.Fragment>
		)
	}

	public componentDidMount(): void
	{
		this.props.tileManager.ghostTileChangedEmitter.onPost(this._tileManager_PostGhostTileChangedEmitter_ForceUpdate);
	}

	public componentWillUnmount(): void
	{
		this.props.tileManager.ghostTileChangedEmitter.offPost(this._tileManager_PostGhostTileChangedEmitter_ForceUpdate);
	}

	private _tileManager_PostGhostTileChangedEmitter_ForceUpdate = (event: GhostTileChangedEvent) =>
	{
		this.forceUpdate();
	}
}

export default withStyles(styles)(GridTiles);

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
