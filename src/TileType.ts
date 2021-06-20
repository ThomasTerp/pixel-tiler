import TileData from "./TileData";

export default class TileType
{
	id: string;
	buildSVG: (tileData: TileData) => React.ReactNode;

	constructor(id: string, buildSVG: (tileData: TileData) => React.ReactNode)
	{
		this.id = id;
		this.buildSVG = buildSVG;
	}
}
