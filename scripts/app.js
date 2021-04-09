import HTMLObject from "./html-object.js";
import GridCanvas from "./grid-canvas.js";

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

		this.gridCanvas = new GridCanvas(this.html);
		this.gridCanvas.initialize();
	}

	buildHTML()
	{
		return $(`<div class="App"></div>`);
	}
}
