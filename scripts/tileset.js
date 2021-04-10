
export default class Tileset
{
	name;
	_tiles;

	constructor(name)
	{
		this.name = name;
		this._tiles = {};
	}

	addTile(tileID, tile)
	{
		this._tiles[tileID] = tile;
	}

	getTile(tileID)
	{
		return this._tiles[tileID];
	}
}
