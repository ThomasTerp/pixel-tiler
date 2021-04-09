import HTMLObject from "./html-object.js";

function isPowerOfTwo(x)
{
	return (Math.log(x)/Math.log(2)) % 1 === 0;
}

export default class GridCanvas extends HTMLObject
{
	canvas;
	maxGridSize = 128;
	_gridSize = 32;

	set gridSize(value)
	{
		if(value <= 0 || value > this.maxGridSize)
		{
			throw new RangeError("gridSize must be above 0 and less than or equal to maxGridSize");
		}

		if(!isPowerOfTwo(value))
		{
			throw new RangeError("gridSize must be a power of two");
		}

		this._gridSize = value;

		this.rebuildHTML();
	}

	get gridSize()
	{
		return this._gridSize;
	}

	constructor(containerHTML)
	{
		super(containerHTML);
	}

	buildHTML()
	{
		return $(`
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="subGrid" width="${this._gridSize}" height="${this._gridSize}" patternUnits="userSpaceOnUse">
						<path d="M0,${this._gridSize} L0,0 L${this._gridSize},0" fill="none" stroke="grey" stroke-width="1" />
					</pattern>
					<pattern id="grid" width="${this.maxGridSize}" height="${this.maxGridSize}" patternUnits="userSpaceOnUse">
						<rect width="${this.maxGridSize}" height="${this.maxGridSize}" fill="url(#subGrid)" />
						<path d="M0,${this.maxGridSize} L0,0 L${this.maxGridSize},0" fill="none" stroke="black" stroke-width="1" />
					</pattern>
				</defs>

				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
		`);
	}
}