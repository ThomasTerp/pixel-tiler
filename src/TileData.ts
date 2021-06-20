import TileType from "./TileType";
import Vector2D from "./Vector2D";

export default class TileData
{
	tileType: TileType;
	position: Vector2D;
	size: number;
	rotation: number;
	color: string;
	colorID: number;

	constructor(tileType: TileType, position: Vector2D, size: number, rotation: number, color: string, colorID: number)
	{
		this.tileType = tileType;
		this.position = position;
		this.size = size;
		this.rotation = rotation;
		this.color = color;
		this.colorID = colorID;
	}
}
