import TileType from "./TileType";

export default class Tileset
{
	public name: string;
	public tileTypes: TileType[];

	constructor(name: string, tileTypes: TileType[])
	{
		this.name = name;
		this.tileTypes = tileTypes;
	}
}
