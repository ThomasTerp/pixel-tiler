import HTMLObject from "./html-object.js";
import Grid from "./grid.js";
import Vector2D from "./vector-2d.js";

export default class App extends HTMLObject
{
	grid;
	_offset = new Vector2D(0, 0);
	_isDragging = false;
	_dragOffset = new Vector2D(0, 0);

	set offset(value)
	{
		this._offset = value;
		this.grid.offset = value.copy();
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

		this.grid.html.on("mousedown", (event) =>
		{
			this._dragOffset.x = this.offset.x - event.offsetX;
			this._dragOffset.y = this.offset.y - event.offsetY;
			this._isDragging = true;
		});

		$(document).on("mouseup", (event) =>
		{
			this._isDragging = false;
		});

		this.grid.html.on("mousemove", (event) =>
		{
			if(this.isDragging)
			{
				this.offset = new Vector2D(event.offsetX + this._dragOffset.x, event.offsetY + this._dragOffset.y);
			}
		});
	}

	buildHTML()
	{
		return $(`<div class="App"></div>`);
	}
}
