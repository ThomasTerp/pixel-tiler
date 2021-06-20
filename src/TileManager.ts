import TileData from "./TileData";
import Emitter, {Event} from "./Emitter";
import Tileset from "./Tileset";
import TileType from "./TileType";

export class TilePlacedEvent extends Event
{
	tileID: number;
	tileData: TileData;

	constructor(tileID: number, tileData: TileData)
	{
		super();

		this.tileID = tileID;
		this.tileData = tileData;
	}
}

export class TileErasedEvent extends Event
{
	tileID: number;

	constructor(tileID: number)
	{
		super();

		this.tileID = tileID;
	}
}

export default class TileManager
{
	public tilesets: Tileset[];
	public placedTiles: TileData[] = [];
	public tilePlacedEmitter: Emitter<TilePlacedEvent> = new Emitter<TilePlacedEvent>();
	public tileErasedEmitter: Emitter<TileErasedEvent> = new Emitter<TileErasedEvent>();
	private _selectedTileType: TileType;
	private _currentTileID: number = 0;

	constructor(tilesets: Tileset[])
	{
		this.tilesets = tilesets;
		this._selectedTileType = this.tilesets[0].tileTypes[0];
	}

	placeTile(tileData: TileData): number
	{
		const tilePlacedEvent = this.tilePlacedEmitter.emit(new TilePlacedEvent(this._currentTileID++, tileData));
		this.placedTiles[tilePlacedEvent.tileID] = tilePlacedEvent.tileData;

		return tilePlacedEvent.tileID;
	}

	eraseTile(tileID: number): TileData
	{
		const tileErasedEvent = this.tileErasedEmitter.emit(new TileErasedEvent(tileID));
		const tileData = this.placedTiles[tileErasedEvent.tileID];

		delete this.placedTiles[tileErasedEvent.tileID];

		return tileData;
	}
}
