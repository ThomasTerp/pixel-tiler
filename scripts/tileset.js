
export default class Tileset
{
	name;
	_tiles;

	get tiles()
	{
		return this._tiles;
	}

	constructor(name)
	{
		this.name = name;
		this._tiles = {};
	}

	setTile(tileID, tile)
	{
		this._tiles[tileID] = tile;
	}

	getTile(tileID)
	{
		return this._tiles[tileID];
	}
}
