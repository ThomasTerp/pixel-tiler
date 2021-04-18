import Tool from "./tool.js";
import Vector2D from "./../vector-2d.js";
import getElementsAtPosition from "./../get-elements-at-position.js";
import parseSVG from "./../parse-svg.js";

export default class BrushTool extends Tool
{
	boundaryBoxMultiplier = 0.08;
	_isDrawing = false;
	_lastDrawnGridPosition = new Vector2D(0, 0);

	get isDrawing()
	{
		return this._isDrawing;
	}

	constructor(app, containerHTML, propertiesContainerHTML)
	{
		super(app, containerHTML, propertiesContainerHTML, "Brush")
	}

	initialize()
	{
		super.initialize();

		$(document).on("mousewheel", (event) =>
		{
			if(!this.app.isCTRLPressed)
			{
				if(event.originalEvent.wheelDelta > 0)
				{
					this.app.rotateSelectedRotationClockwise();
				}
				else if(event.originalEvent.wheelDelta < 0)
				{
					this.app.rotateSelectedRotationAnticlockwise();
				}
			}
		});
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
		const brushTilesHTML = $(`<div class="brush-tiles"></div>`);

		for(const tile of Object.values(this.app.selectedTileset.tiles))
		{
			brushTilesHTML.append(tile.buildHTML(true, 64, new Vector2D(0, 0), "white", 0));

			const tileHTML = brushTilesHTML.find("> :last-child");
			tileHTML.data("tile", tile);

			if(this.app.selectedTile === tile)
			{
				tileHTML.addClass("selected-tile");
			}
		}

		propertiesHTML.append(brushTilesHTML);

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

		this.app.contentHTML.on("mousedown", (event) =>
		{
			switch(event.originalEvent.which)
			{
				case 1:
					const position = new Vector2D(event.originalEvent.offsetX, event.originalEvent.offsetY);

					this._isDrawing = true;
					this._draw(position, true);

					break;
			}
		});

		$(document).on("mouseup", (event) =>
		{
			this._isDrawing = false;
			this._lastDrawnGridPosition = new Vector2D(0, 0);
		});

		this.app.contentHTML.on("mousemove", (event) =>
		{
			if(this.isDrawing)
			{
				const position = new Vector2D(event.originalEvent.offsetX, event.originalEvent.offsetY);

				//this._removeTileHTMLs(position);
				this._draw(position);
			}
		});
	}

	_removeTileHTMLs(position)
	{
		for(const element of getElementsAtPosition(position))
		{
			const elementHTML = $(element);

			if(elementHTML.hasClass("tile-pointer"))
			{
				const tileHTML = elementHTML.parent();

				//TODO: Check grid size
				//TODO: Check rotation
				//TODO: Fix _lastDrawnGridPosition when 0, 0
				if(tileHTML.data("gridPosition") !== this._lastDrawnGridPosition)
				{
					tileHTML.remove();
				}
			}
		}
	}

	_draw(position, override)
	{
		const viewPosition = this.app.grid.cursorToView(position);
		const gridPosition = this.app.grid.positionToGrid(viewPosition);
		const differencePosition = viewPosition.copy().subtract(this.app.grid.gridToPosition(gridPosition));
		const gridSize = this.app.grid.gridSize;
		const boundaryBoxSize = gridSize * this.boundaryBoxMultiplier;

		if(override || (!gridPosition.equal(this._lastDrawnGridPosition) && (differencePosition.x >= boundaryBoxSize && differencePosition.y >= boundaryBoxSize && differencePosition.x <= gridSize - boundaryBoxSize && differencePosition.y <= gridSize - boundaryBoxSize)))
		{
			this._removeTileHTMLs(position);
			this.app.grid.placeTile(this.app.selectedTile, gridPosition, "white", this.app.selectedRotation);
			this._lastDrawnGridPosition = gridPosition;
		}
	}
}
