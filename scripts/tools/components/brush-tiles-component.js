import Component from "./component-base.js";
import Vector2D from "./../../vector-2d.js";

export default class BrushTilesComponent extends Component
{
	constructor(app, containerHTML)
	{
		super(app, containerHTML);
	}

	initialize()
	{
		super.initialize();

		this._activateGlobalEvents();
	}

	buildHTML()
	{
		const brushTilesHTML = $(`<div class="brush-tiles"></div>`);

		for(const tile of Object.values(this.app.selectedTileset.tiles))
		{
			brushTilesHTML.append(tile.buildHTML(true, 64, new Vector2D(0, 0), this.app.getPaletteColor(this.app.selectedColor), 0));

			const tileHTML = brushTilesHTML.find("> :last-child");
			tileHTML.data("tile", tile);

			if(this.app.selectedTile === tile)
			{
				tileHTML.addClass("selected-tile");
			}
		}

		return brushTilesHTML
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		this._activateEvents();
	}

	_setSelectedTileHTML(tileHTML)
	{
		this.app.selectedTile = tileHTML.data("tile");
		this.html.find("> svg").removeClass("selected-tile");
		tileHTML.addClass("selected-tile");
	}

	_activateGlobalEvents()
	{
		this.app.selectedColorChangeEvent.startListening((event) =>
		{
			this.html.find("> svg > :not(.tile-pointer)").attr("fill", this.app.getPaletteColor(event.selectedColor));
		});

		this.app.paletteChangeEvent.startListening((event) =>
		{
			if(this.app.selectedColor === event.colorIndex)
			{
				this.html.find("> svg > :not(.tile-pointer)").attr("fill", event.color);
			}
		});
	}

	_activateEvents()
	{
		this.html.on("mousedown", ".tile-pointer", (event) =>
		{
			this._setSelectedTileHTML($(event.target).parent());
		});
	}
}
