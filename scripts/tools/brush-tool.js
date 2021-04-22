import Tool from "./tool.js";
import Vector2D from "./../vector-2d.js";
import getElementsAtPosition from "./../get-elements-at-position.js";
import BrushTilesComponent from "./components/brush-tiles-component.js";
import PaletteComponent from "./components/palette-component.js";

export default class BrushTool extends Tool
{
	name = "Brush"
	boundaryBoxMultiplier = 0.02;
	_isDrawing = false;
	_lastDrawnGridPosition = new Vector2D(0, 0);
	_tileGhostPosition = new Vector2D(0, 0);
	_brushTilesComponent;

	get isDrawing()
	{
		return this._isDrawing;
	}

	constructor(app, containerHTML, propertiesContainerHTML)
	{
		super(app, containerHTML, propertiesContainerHTML);
	}

	initialize()
	{
		super.initialize();

		this._activateGlobalEvents();
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		this._paletteComponent = new PaletteComponent(this.app, this.propertiesHTML, true);
		this._paletteComponent.initialize();

		this._brushTilesComponent = new BrushTilesComponent(this.app, this.propertiesHTML);
		this._brushTilesComponent.initialize();
	}

	_activateGlobalEvents()
	{
		$(document).on("mousewheel", (event) =>
		{
			if(this.isActive)
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

				if(this.app.isMouseOnContent)
				{
					this._drawGhost();
				}
			}
		});

		$(document).on("keypress", (event) =>
		{
			if(this.isActive)
			{
				switch(event.originalEvent.which)
				{
					case 120:
						this.app.rotateSelectedRotationClockwise();
						break;

					case 122:
						this.app.rotateSelectedRotationAnticlockwise();
						break;
				}

				if(this.app.isMouseOnContent)
				{
					this._drawGhost();
				}
			}
		});

		$(document).on("mouseup", (event) =>
		{
			if(this.isActive)
			{
				this._lastDrawnGridPosition = new Vector2D(0, 0);
				this._isDrawing = false;
			}
		});

		this.app.contentHTML.on("mousedown", (event) =>
		{
			if(this.isActive)
			{
				switch(event.originalEvent.which)
				{
					case 1:
						const position = new Vector2D(event.originalEvent.offsetX, event.originalEvent.offsetY);

						this._isDrawing = true;
						this._draw(position, true);

						break;
				}
			}
		});

		this.app.contentHTML.on("mousemove", (event) =>
		{
			if(this.isActive && this.isDrawing)
			{
				this._draw(new Vector2D(event.originalEvent.offsetX, event.originalEvent.offsetY));
			}
		});

		$(document).on("mousemove", (event) =>
		{
			if(this.isActive)
			{
				if(this.app.isMouseOnContent)
				{
					this._tileGhostPosition = new Vector2D(event.originalEvent.offsetX, event.originalEvent.offsetY);
					this._drawGhost();
				}
				else
				{
					this._removeGhost();
				}
			}
		});

		$(document).mouseleave(() =>
		{
			if(this.isActive)
			{
				this._removeGhost();
			}
		});
	}

	_deactivate()
	{
		super._deactivate();

		this._lastDrawnGridPosition = new Vector2D(0, 0);
		this._isDrawing = false;
		this._removeGhost();
	}

	_drawGhost()
	{
		const gridSize = this.app.grid.gridSize;
		let tileGhostHTML = $(".tile-ghost");

		if(tileGhostHTML.length > 0 && (tileGhostHTML.data("gridSize") !== gridSize || tileGhostHTML.attr("color") !== this.app.getPaletteColor(this.app.selectedColor) || tileGhostHTML.attr("rotation") !== this.app.selectedRotation))
		{
			this._removeGhost();
		}

		tileGhostHTML = $(".tile-ghost");

		if(tileGhostHTML.length === 0)
		{
			const tileHTML = this.app.selectedTile.buildHTML(true, gridSize, new Vector2D(-16, -16), this.app.getPaletteColor(this.app.selectedColor), this.app.selectedRotation);

			const appHTML = $(".app");
			appHTML.append(tileHTML);

			tileGhostHTML = appHTML.find("> :last-child");
			tileGhostHTML.addClass("tile-ghost");
			tileGhostHTML.data("gridSize", gridSize);
			tileGhostHTML.attr("color", this.app.getPaletteColor(this.app.selectedColor));
			tileGhostHTML.attr("rotation", this.app.selectedRotation);
		}

		$(".tile-ghost").css({
			left: this._tileGhostPosition.x,
			top: this._tileGhostPosition.y
		});
	}

	_removeGhost()
	{
		const tileGhostHTML = $(".tile-ghost");

		if(tileGhostHTML.length > 0)
		{
			$(".tile-ghost").remove();
		}
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
			if(!this.app.isShiftPressed)
			{
				this._removeTileHTMLs(position);
			}

			this.app.grid.placeTile(this.app.selectedTile, gridPosition, this.app.selectedColor, this.app.getPaletteColor(this.app.selectedColor), this.app.selectedRotation);
			this._lastDrawnGridPosition = gridPosition;
		}
	}
}
