import HTMLObject from "./html-object.js";
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
		if(value < 0)
		{
			throw new RangeError("zoom must be above 0");
		}

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
	}

	buildHTML()
	{
		return $(`
			<svg class="grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="${this.uniqueID}-pattern1" width="${this._gridSize}" height="${this._gridSize}" patternUnits="userSpaceOnUse">
						<path d="M0,${this._gridSize} L0,0 L${this._gridSize},0" fill="none" stroke="grey" stroke-width="1" />
					</pattern>
					<pattern id="${this.uniqueID}-pattern2" width="${this.maxGridSize}" height="${this.maxGridSize}" patternUnits="userSpaceOnUse">
						<rect width="${this.maxGridSize}" height="${this.maxGridSize}" fill="url(#${this.uniqueID}-pattern1)" />
						<path d="M0,${this.maxGridSize} L0,0 L${this.maxGridSize},0" fill="none" stroke="black" stroke-width="1" />
					</pattern>
				</defs>

				<rect id="${this.uniqueID}-rect1" x="-100%" y="-100%" width="200%" height="200%" fill="url(#${this.uniqueID}-pattern2)" />
				<line id="${this.uniqueID}-line1" x1="-100%" y1="0" x2="100%" y2="0" stroke="black" stroke-width="2" />
				<line id="${this.uniqueID}-line2" x1="0" y1="-100%" x2="0" y2="100%" stroke="black" stroke-width="2" />
			</svg>
		`);
	}

	placeTile(gridPosition, tile)
	{
		const half = this.gridSize / 2;

		const tileHTML = tile.buildHTML(this.gridSize);
		tileHTML.firstChild.setAttribute("x", `${gridPosition.x * this.gridSize}px`);
		tileHTML.firstChild.setAttribute("y", `${gridPosition.y * this.gridSize}px`);

		this.html.append(tileHTML);

		const lastTileHTML = this.html.find(">:last-child");
		lastTileHTML.data("gridPosition", gridPosition);

		return lastTileHTML;
	}

	cursorToView(cursorPosition)
	{
		return new Vector2D(
			(cursorPosition.x - this.offset.x) * (this.zoom / this.html.width()),
			(cursorPosition.y - this.offset.y) * (this.zoom / this.html.height())
		);
	}

	positionToGrid(position)
	{
		return new Vector2D(
			Math.floor(position.x / this.gridSize),
			Math.floor(position.y / this.gridSize)
		)
	}

	_applyViewBox()
	{
		const width = this.html.width();
		const x = this.offset.x / (width / this.zoom);
		const y = this.offset.y / (width / this.zoom);

		this.html[0].setAttribute("viewBox", `${-x},${-y} ${this.zoom},${this.zoom}`);
		$(`#${this.uniqueID}-rect1`).attr("x", `${-x}px`);
		$(`#${this.uniqueID}-rect1`).attr("y", `${-y}px`);
		$(`#${this.uniqueID}-line1`).attr("x1", `${-x}px`);
		$(`#${this.uniqueID}-line1`).attr("x2", `${-x + this.zoom}px`);
		$(`#${this.uniqueID}-line2`).attr("y1", `${-y}px`);
		$(`#${this.uniqueID}-line2`).attr("y2", `${-y + this.zoom}px`);
	}
}
