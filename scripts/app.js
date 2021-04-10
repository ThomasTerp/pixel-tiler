import HTMLObject from "./html-object.js";
import Grid from "./grid.js";
import Vector2D from "./vector-2d.js";
import ZoomPanRenderer from "./zoom/zoom-pan-renderer.js";
import clamp from "./clamp.js";

export default class App extends HTMLObject
{
	grid;
	offsetAdd = 20;
	zoomPanRenderer;
	zoomAdd = 120;
	_offset = new Vector2D(0, 0);
	_isDragging = false;
	_dragOffset = new Vector2D(0, 0);
	_contentCursorOffset = new Vector2D(0, 0);

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

	constructor(containerHTML)
	{
		super(containerHTML);
	}

	initialize()
	{
		super.initialize();

		this.grid = new Grid(this.contentHTML);
		this.grid.initialize();

		this.offset = new Vector2D(this.grid.html.width() / 2, this.grid.html.height() / 2);
		this.zoomPanRenderer = new ZoomPanRenderer(this.contentHTML);

		this._activateEvents();
	}

	buildHTML()
	{
		return $(`
			<div class="app">
				<div id="testt" class="content">
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
		this.html.on("mousedown", (event) =>
		{
			if (event.originalEvent.which === 2)
			{
				this._dragOffset.x = this.offset.x - event.offsetX;
				this._dragOffset.y = this.offset.y - event.offsetY;
				this._isDragging = true;
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
					console.log("zoom")
					this.zoomPanRenderer.addZoom(-this.zoomAdd);
					break;

				case 45:
					this.zoomPanRenderer.addZoom(this.zoomAdd);
					break;
			}
		});

		$(this.contentHTML).on("mousemove", (event) =>
		{
			this._contentCursorOffset.x = event.originalEvent.offsetX;
			this._contentCursorOffset.y = event.originalEvent.offsetY;
		});
	}
}
