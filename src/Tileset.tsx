import Tile from "./Tile";

export default class Tileset
{
	name: string;
	_tiles: {[key: string]: Tile};

	get tiles()
	{
		return this._tiles;
	}

	constructor(name: string)
	{
		this.name = name;
		this._tiles = {};
	}

	setTile(tileID: string, tile: Tile)
	{
		this._tiles[tileID] = tile;
	}

	getTile(tileID: string)
	{
		return this._tiles[tileID];
	}
}
