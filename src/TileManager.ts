import Tileset, {TileRenderer} from "./Tileset";

export default class TileManager
{
	public tilesets: Tileset[];
	private _selectedTile: TileRenderer;

	constructor(tilesets: Tileset[])
	{
		this.tilesets = tilesets;
		this._selectedTile = this.tilesets[0].tiles[0];
	}
}
