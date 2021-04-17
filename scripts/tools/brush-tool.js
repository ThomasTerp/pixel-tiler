import Tool from "./tool.js";

export default class BrushTool extends Tool
{
	constructor(app, containerHTML, propertiesContainerHTML)
	{
		super(app, containerHTML, propertiesContainerHTML, "Brush")
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		this.brushTilesHTML = this.propertiesHTML.find("> .brush-tiles");

		this._activateEvents();
	}

	buildPropertiesHTML()
	{
		const propertiesHTML = super.buildPropertiesHTML();
		const brushTiles = $(`<div class="brush-tiles"></div>`);

		for(const tile of Object.values(this.app.selectedTileset.tiles))
		{
			brushTiles.append(tile.buildHTML(64, "white"));

			const tileHTML = brushTiles.find("> :last-child");
			tileHTML.data("tile", tile);

			if(this.app.selectedTile === tile)
			{
				tileHTML.addClass("selected-tile");
			}
		}

		propertiesHTML.append(brushTiles);

		return propertiesHTML;
	}

	_setSelectedTileHTML(tileHTML)
	{
		this.app.selectedTile = tileHTML.data("tile");
		this.brushTilesHTML.find("> svg").removeClass("selected-tile");
		tileHTML.addClass("selected-tile");
	}

	_activateEvents()
	{
		this.propertiesHTML.on("click", ".tile-pointer", (event) =>
		{
			this._setSelectedTileHTML($(event.target).parent());
		});
	}
}
