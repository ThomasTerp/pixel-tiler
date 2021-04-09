import HTMLObject from "./html-object.js";

function isPowerOfTwo(x)
{
	return (Math.log(x)/Math.log(2)) % 1 === 0;
}

export default class Grid extends HTMLObject
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
			<svg width="100%" height="100%" viewBox="-1000,-1000 2000,2000" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="subGrid" width="${this._gridSize}" height="${this._gridSize}" patternUnits="userSpaceOnUse">
						<path d="M0,${this._gridSize} L0,0 L${this._gridSize},0" fill="none" stroke="grey" stroke-width="1" />
					</pattern>
					<pattern id="grid" width="${this.maxGridSize}" height="${this.maxGridSize}" patternUnits="userSpaceOnUse">
						<rect width="${this.maxGridSize}" height="${this.maxGridSize}" fill="url(#subGrid)" />
						<path d="M0,${this.maxGridSize} L0,0 L${this.maxGridSize},0" fill="none" stroke="black" stroke-width="1" />
					</pattern>
				</defs>

				<rect x="-100%" y="-100%" width="200%" height="200%" fill="url(#grid)" />
				<line x1="-100%" y1="0" x2="100%" y2="0" stroke="black" stroke-width="2" />
				<line x1="0" y1="-100%" x2="0" y2="100%" stroke="black" stroke-width="2" />
			</svg>
		`);
	}
}