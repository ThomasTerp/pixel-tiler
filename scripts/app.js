import HTMLObject from "./html-object.js";
import Grid from "./grid.js";
import Vector2D from "./vector-2d.js";

export default class App extends HTMLObject
{
	grid;
	zoomMultiplier = 0.001;
	zoomMinimum = 10;
	zoomAdd = 120;
	offsetAdd = 20;
	_zoom = 1000;
	_offset = new Vector2D(0, 0);
	_isDragging = false;
	_dragOffset = new Vector2D(0, 0);

	set zoom(value)
	{
		if(value < 0)
		{
			throw new RangeError("zoom must be above 0");
		}

		this._zoom = value;
		this._applyViewBox();

		this.grid.zoom = value;
	}

	get zoom()
	{
		return this._zoom;
	}

	set offset(value)
	{
		this._offset = value;
		this._applyViewBox();

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

		this.grid = new Grid(this.html);
		this.grid.initialize();

		this.offset = new Vector2D(this.grid.html.width() / 2, this.grid.html.height() / 2);

		this.html.on("mousewheel", (event) =>
		{
			this._addZoom(event.originalEvent.wheelDelta);
		});

		this.html.on("mousedown", (event) =>
		{
			if(event.originalEvent.which === 2)
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
			if(this.isDragging)
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
			switch(event.originalEvent.which)
			{
				case 43:
					this._addZoom(-this.zoomAdd);
					break;

				case 45:
					this._addZoom(this.zoomAdd);
					break;
			}
		});
	}

	buildHTML()
	{
		return $(`
			<div class="app">
				<svg xmlns="http://www.w3.org/2000/svg>
				</svg>
			</div>
		`);
	}

	_addZoom(zoomAdd)
	{
		this.zoom = Math.max(this.zoom - zoomAdd * this.zoom * this.zoomMultiplier, this.zoomMinimum);
	}

	_applyViewBox()
	{

	}
}
