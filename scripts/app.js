import HTMLObject from "./html-object.js";
import Grid from "./grid.js";
import Vector2D from "./vector-2d.js";

export default class App extends HTMLObject
{
	tileset;
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

	constructor(containerHTML, tileset)
	{
		super(containerHTML);

		this.tileset = tileset;
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
					this.grid.placeTile(this.grid.positionToGrid(this.grid.cursorToView(this._contentCursorOffset)), this.tileset.getTile("tile3"));
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
		});

		this.html.on("mousemove", (event) =>
		{
			if (this.isDragging)
			{
				this.offset = new Vector2D(event.offsetX + this._dragOffset.x, event.offsetY + this._dragOffset.y);
			}
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
		});
	}

	_addZoom(zoomAdd)
	{
		this.zoom = Math.max(this.zoom - zoomAdd * this.zoom * this.zoomMultiplier, this.zoomMinimum);
	}
}
