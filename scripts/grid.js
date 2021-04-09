import HTMLObject from "./html-object.js";
import generateUniqueID from "./generate-unique-id.js";
import Vector2D from "./vector-2d.js";

function isPowerOfTwo(x)
{
	return (Math.log(x)/Math.log(2)) % 1 === 0;
}

export default class Grid extends HTMLObject
{
	maxGridSize = 128;
	_gridSize = 32;
	_zoom = 1000;
	_offset = new Vector2D(0, 0);

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

	set zoom(value)
	{
		this._zoom = value;

		this._applyViewBox();
	}

	get zoom()
	{
		return this._zoom;
	}

	set offset(value)
	{
		this._offset = value;

		this._applyViewBox();
	}

	get offset()
	{
		return this._offset;
	}

	constructor(containerHTML)
	{
		super(containerHTML);

		this.uniqueID = `grid${generateUniqueID()}`;
	}

	buildHTML()
	{
		return $(`
			<svg id="${this.uniqueID}" width="100%" height="100%" viewBox="-${(this.zoom / 2) + this.offset.x},-${(this.zoom / 2) + this.offset.y} ${this.zoom},${this.zoom}" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="${this.uniqueID}pattern1" width="${this._gridSize}" height="${this._gridSize}" patternUnits="userSpaceOnUse">
						<path d="M0,${this._gridSize} L0,0 L${this._gridSize},0" fill="none" stroke="grey" stroke-width="1" />
					</pattern>
					<pattern id="${this.uniqueID}pattern2" width="${this.maxGridSize}" height="${this.maxGridSize}" patternUnits="userSpaceOnUse">
						<rect width="${this.maxGridSize}" height="${this.maxGridSize}" fill="url(#${this.uniqueID}pattern1)" />
						<path d="M0,${this.maxGridSize} L0,0 L${this.maxGridSize},0" fill="none" stroke="black" stroke-width="1" />
					</pattern>
				</defs>

				<rect x="-100%" y="-100%" width="200%" height="200%" fill="url(#${this.uniqueID}pattern2)" />
				<line x1="-100%" y1="0" x2="100%" y2="0" stroke="black" stroke-width="2" />
				<line x1="0" y1="-100%" x2="0" y2="100%" stroke="black" stroke-width="2" />
			</svg>
		`);
	}

	_applyViewBox()
	{
		const width = this.html.width();
		const x = this.offset.x / (width / this.zoom);
		const y = this.offset.y / (width / this.zoom);

		this.html[0].setAttribute("viewBox", `${-x},${-y} ${this.zoom},${this.zoom}`);
	}
}
