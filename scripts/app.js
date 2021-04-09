import HTMLObject from "./html-object.js";
import Grid from "./grid.js";
import Vector2D from "./vector-2d.js";

export default class App extends HTMLObject
{
	gridCanvas;

	constructor(containerHTML)
	{
		super(containerHTML);
	}

	initialize()
	{
		super.initialize();

		this.grid = new Grid(this.html);
		this.grid.initialize();

		this.grid.html.on("mousemove", (event) =>
		{
			this.grid.offset = new Vector2D(event.offsetX, event.offsetY);
		});
	}

	buildHTML()
	{
		return $(`<div class="App"></div>`);
	}
}
