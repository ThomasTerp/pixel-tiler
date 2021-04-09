import HTMLObject from "./html-object.js";
import Grid from "./grid.js";

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
	}

	buildHTML()
	{
		return $(`<div class="App"></div>`);
	}
}
