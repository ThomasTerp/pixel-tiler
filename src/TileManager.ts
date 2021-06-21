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

export class SelectedTilesetChangedEvent extends Event
{
	tileset: Tileset;

	constructor(tileset: Tileset)
	{
		super();

		this.tileset = tileset;
	}
}

export class SelectedTileTypeChangedEvent extends Event
{
	tileType: TileType;

	constructor(tileType: TileType)
	{
		super();

		this.tileType = tileType;
	}
}

export default class TileManager
{
	public tilesets: Tileset[];
	public placedTiles: TileData[] = [];
	public tilePlacedEmitter: Emitter<TilePlacedEvent> = new Emitter<TilePlacedEvent>();
	public tileErasedEmitter: Emitter<TileErasedEvent> = new Emitter<TileErasedEvent>();
	public selectedTilesetChangedEmitter: Emitter<SelectedTilesetChangedEvent> = new Emitter<SelectedTilesetChangedEvent>();
	public selectedTileTypeChangedEmitter: Emitter<SelectedTileTypeChangedEvent> = new Emitter<SelectedTileTypeChangedEvent>();
	private _selectedTileset: Tileset;
	private _selectedTileType: TileType;
	private _currentTileID: number = 0;

	set selectedTileset(value: Tileset)
	{
		const selectedTilesetChangedEvent = this.selectedTilesetChangedEmitter.emit(new SelectedTilesetChangedEvent(value));
		this._selectedTileset = selectedTilesetChangedEvent.tileset;
	}

	get selectedTileset(): Tileset
	{
		return this._selectedTileset;
	}

	set selectedTileType(value: TileType)
	{
		const selectedTileTypeChangedEvent = this.selectedTileTypeChangedEmitter.emit(new SelectedTileTypeChangedEvent(value));
		this._selectedTileType = selectedTileTypeChangedEvent.tileType;
	}

	get selectedTileType(): TileType
	{
		return this._selectedTileType;
	}

	constructor(tilesets: Tileset[])
	{
		this.tilesets = tilesets;
		this._selectedTileset = tilesets[0];
		this._selectedTileType = this.selectedTileset.tileTypes[0];
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
