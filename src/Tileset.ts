
export type RenderTileFunction = (size: number, color: string) => React.ReactNode;

export type TileRenderer = {
	tileID: string,
	renderTile: RenderTileFunction
}

export default class Tileset
{
	name: string;
	_tiles: TileRenderer[];

	get tiles()
	{
		return this._tiles;
	}

	constructor(name: string, tiles: TileRenderer[])
	{
		this.name = name;
		this._tiles = tiles;
	}

	getByTileID(): TileRenderer | undefined
	{
		return this.tiles.find((tile: TileRenderer) => tile.tileID);
	}
}
