import HTMLObject from "./html-object.js";
import Grid from "./grid.js";
import Vector2D from "./vector-2d.js";

function getElementsAtPosition(position)
{
	const stack = []
	let element;

	do
	{
		element = document.elementFromPoint(position.x, position.y);
		stack.push(element);
		element.classList.add("pointer-events-none");
	}
	while(element.tagName !== "HTML");

	for(var i  = 0; i < stack.length; i += 1)
	{
		stack[i].classList.remove("pointer-events-none");
	}

	return stack;
}

export default class App extends HTMLObject
{
	tilesets;
	selectedTileset = "Default"
	selectedTile = "tile1";
	grid;
	offsetAdd = 20;
	zoomMultiplier = 0.001;
	zoomMinimum = 10;
	zoomAdd = 120;
	_zoom = 1000;
	_offset = new Vector2D(0, 0);
	_isDragging = false;
	_dragOffset = new Vector2D(0, 0);
	_contentCursorOffset = new Vector2D(0, 0);
	_isDrawing = false;
	_lastDrawmTileHTML;
	_lastDrawnGridPosition = new Vector2D(0, 0);
	_lastHoverHTML;

	set zoom(value)
	{
		if(value < 0)
		{
			throw new RangeError("zoom must be above 0");
		}

		this._zoom = value;
		this.grid.zoom = value;
	}

	get zoom()
	{
		return this._zoom;
	}

	set offset(value)
	{
		this._offset = value;
		this.grid.offset = this.offset.copy();
	}

	get offset()
	{
		return this._offset;
	}

	get isDragging()
	{
		return this._isDragging;
	}

	get isDrawing()
	{
		return this._isDrawing;
	}

	constructor(containerHTML, tilesets)
	{
		super(containerHTML);

		this.tilesets = tilesets;
		this.selectedTileset = tilesets[0];
		this.selectedTile = this.selectedTileset.getTile("tile1");
	}

	initialize()
	{
		super.initialize();

		this.grid = new Grid(this.contentHTML);
		this.grid.initialize();

		this.offset = new Vector2D(this.grid.html.width() / 2, this.grid.html.height() / 2);

		this._activateEvents();
	}

	buildHTML()
	{
		return $(`
			<div class="app">
				<div class="content">
				</div>
			</div>
		`);
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		this.contentHTML = this.html.find(">.content");
	}

	_activateEvents()
	{
		this.html.on("mousewheel", (event) =>
		{
			this._addZoom(event.originalEvent.wheelDelta);

			/*const center = new Vector2D(this.contentHTML.width() / 2, this.contentHTML.height() / 2);

			if(event.originalEvent.wheelDelta > 0)
			{
				const offset = new Vector2D(this.offset.x, this.offset.y);
				offset.x = (this._contentCursorOffset.x - offset.x) * (this.zoom) * 0.000001;
				offset.y = (this._contentCursorOffset.y - offset.y) * (this.zoom) * 0.000001;
				this.offset = offset
			}
			else
			{
				const offset = new Vector2D(this.offset.x, this.offset.y);
				offset.x += (this._contentCursorOffset.x - center.x) * (this.zoom - zoomDifference) * 0.0001;
				offset.y += (this._contentCursorOffset.y - center.y) * (this.zoom - zoomDifference) * 0.0001;
				this.offset = offset
			}*/
		});

		this.html.on("mousedown", (event) =>
		{
			switch(event.originalEvent.which)
			{
				case 1:
					this._isDrawing = true;
					this._draw(this._contentCursorOffset, true);

					break;

				case 2:
					this._dragOffset.x = this.offset.x - event.offsetX;
					this._dragOffset.y = this.offset.y - event.offsetY;
					this._isDragging = true;
					break;
			}
		});

		$(document).on("mouseup", (event) =>
		{
			this._isDragging = false;
			this._isDrawing = false;
		});

		$(document).on("keydown", (event) =>
		{
			switch(event.originalEvent.which)
			{
				case 37:
					this.offset = new Vector2D(this.offset.x + this.offsetAdd, this.offset.y);
					break;

				case 38:
					this.offset = new Vector2D(this.offset.x, this.offset.y + this.offsetAdd);
					break;

				case 39:
					this.offset = new Vector2D(this.offset.x - this.offsetAdd, this.offset.y);
					break;

				case 40:
					this.offset = new Vector2D(this.offset.x, this.offset.y - this.offsetAdd);
					break;
			}
		});

		$(document).on("keypress", (event) =>
		{
			switch (event.originalEvent.which)
			{
				case 43:
					this._addZoom(-this.zoomAdd);
					break;

				case 45:
					this._addZoom(this.zoomAdd);
					break;
			}
		});

		$(this.contentHTML).on("mousemove", (event) =>
		{
			this._contentCursorOffset.x = event.originalEvent.offsetX;
			this._contentCursorOffset.y = event.originalEvent.offsetY;

			if(this.isDragging)
			{
				this.offset = new Vector2D(this._contentCursorOffset.x + this._dragOffset.x, this._contentCursorOffset.y + this._dragOffset.y);
			}

			if(this.isDrawing)
			{
				this._removeElements(this._contentCursorOffset);
				this._draw(this._contentCursorOffset);
			}
		});
	}

	_removeElements(position)
	{
		for(const element of getElementsAtPosition(position))
		{
			const elementHTML = $(element);

			if(elementHTML.hasClass("tile-pointer"))
			{
				const tileHTML = elementHTML.parent();

				if(tileHTML.data("gridPosition") !== this._lastDrawnGridPosition)
				{
					tileHTML.remove();
				}
			}
		}
	}

	_draw(position, override)
	{
		const gridPosition = this.grid.positionToGrid(this.grid.cursorToView(position));

		if(override || !gridPosition.equal(this._lastDrawnGridPosition))
		{
			this._removeElements(position);

			this._lastDrawnTileHTML = this.grid.placeTile(gridPosition, this.selectedTile);
			this._lastDrawnGridPosition = gridPosition;
		}
	}

	_addZoom(zoomAdd)
	{
		this.zoom = Math.max(this.zoom - zoomAdd * this.zoom * this.zoomMultiplier, this.zoomMinimum);
	}
}
