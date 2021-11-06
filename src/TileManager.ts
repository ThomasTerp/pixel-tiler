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

export class SelectedRotationChangedEvent extends Event
{
	rotation: number;

	constructor(rotation: number)
	{
		super();

		this.rotation = rotation;
	}
}

export class SelectedSizeChangedEvent extends Event
{
	size: number;

	constructor(size: number)
	{
		super();

		this.size = size;
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
	public selectedRotationChangedEmitter: Emitter<SelectedRotationChangedEvent> = new Emitter<SelectedRotationChangedEvent>();
	public selectedSizeChangedEmitter: Emitter<SelectedSizeChangedEvent> = new Emitter<SelectedSizeChangedEvent>();
	private _selectedTileset: Tileset;
	private _selectedTileType: TileType;
	private _selectedRotation: number = 0;
	private _selectedSize: number = 32;
	private _currentTileID: number = 0;

	set selectedTileset(value: Tileset)
	{
		const selectedTilesetChangedEvent = this.selectedTilesetChangedEmitter.emit(new SelectedTilesetChangedEvent(value));
		this._selectedTileset = selectedTilesetChangedEvent.tileset;
		this.selectedTilesetChangedEmitter.emitPost(selectedTilesetChangedEvent);
	}

	get selectedTileset(): Tileset
	{
		return this._selectedTileset;
	}

	set selectedTileType(value: TileType)
	{
		const selectedTileTypeChangedEvent = this.selectedTileTypeChangedEmitter.emit(new SelectedTileTypeChangedEvent(value));
		this._selectedTileType = selectedTileTypeChangedEvent.tileType;
		this.selectedTileTypeChangedEmitter.emitPost(selectedTileTypeChangedEvent);
	}

	get selectedTileType(): TileType
	{
		return this._selectedTileType;
	}

	set rotation(value: number)
	{
		const selectedRotationChangedEvent = this.selectedRotationChangedEmitter.emit(new SelectedRotationChangedEvent(value));
		this._selectedRotation = selectedRotationChangedEvent.rotation;
		this.selectedRotationChangedEmitter.emitPost(selectedRotationChangedEvent);
	}

	get rotation(): number
	{
		return this._selectedRotation;
	}

	set size(value: number)
	{
		const selectedSizeChangedEvent = this.selectedSizeChangedEmitter.emit(new SelectedSizeChangedEvent(value));
		this._selectedSize = selectedSizeChangedEvent.size;
		this.selectedSizeChangedEmitter.emitPost(selectedSizeChangedEvent);
	}

	get size(): number
	{
		return this._selectedSize;
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
		this.tilePlacedEmitter.emitPost(tilePlacedEvent);

		return tilePlacedEvent.tileID;
	}

	eraseTile(tileID: number): TileData
	{
		const tileErasedEvent = this.tileErasedEmitter.emit(new TileErasedEvent(tileID));
		const tileData = this.placedTiles[tileErasedEvent.tileID];
		delete this.placedTiles[tileErasedEvent.tileID];
		this.tileErasedEmitter.emitPost(tileErasedEvent);

		return tileData;
	}
}
