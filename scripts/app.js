import HTMLObject from "./html-object.js";
import Grid from "./grid.js";
import Vector2D from "./vector-2d.js";
import EventObject from "./event-object.js";
import FileTool from "./tools/file-tool.js";
import BrushTool from "./tools/brush-tool.js";
import EraserTool from "./tools/eraser-tool.js";

export default class App extends HTMLObject
{
	tilesets;
	tools = [];
	selectedTileset;
	selectedTile;
	grid;
	offsetAdd = 20;
	zoomMultiplier = 0.001;
	zoomMinimum = 10;
	zoomAdd = 120;
	selectedColorChangeEvent = new EventObject();
	paletteChangeEvent = new EventObject();
	_selectedColor = 0;
	_palette = [
		"#ffffff",
		"#cccccc",
		"#000000",
		"#333333",
		"#925c3a",
		"#784f35",
		"#dc6d1c",
		"#f4dd42",
		"#b23434",
		"#631d1d",
		"#81b93b",
		"#4d893a",
		"#5e81ca",
		"#343d65",
		"#7a367b",
		"#df84a5"
	];
	_selectedRotation = 0;
	_zoom = 1000;
	_offset = new Vector2D(0, 0);
	_isDragging = false;
	_dragOffset = new Vector2D(0, 0);
	_isShiftPressed = false;
	_isCTRLPressed = false;
	_isMouseOnContent;

	get selectedRotation()
	{
		return this._selectedRotation;
	}

	set zoom(value)
	{
		if(value < 0)
		{
			throw new RangeError("zoom must be above 0");
		}

		this._zoom = value;
		this.grid.zoom = value;
	}

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

	get isMouseOnContent()
	{
		return this._isMouseOnContent;
	}

	get isShiftPressed()
	{
		return this._isShiftPressed;
	}

	get isCTRLPressed()
	{
		return this._isCTRLPressed;
	}

	set selectedColor(value)
	{
		const event = this.selectedColorChangeEvent.broadcast({
			selectedColor: value
		});

		this._selectedColor = event.selectedColor;
	}

	get selectedColor()
	{
		return this._selectedColor;
	}

	get palette()
	{
		return [...this._palette];
	}

	constructor(containerHTML, tilesets)
	{
		super(containerHTML);

		this.tilesets = tilesets;
		this.selectedTileset = tilesets[0];
		this.selectedTile = this.selectedTileset.getTile("tile1");
	}

	initialize()
	{
		super.initialize();

		this.grid = new Grid(this.contentHTML);
		this.grid.initialize();
		this.offset = new Vector2D(window.innerWidth / 2, window.innerHeight / 2);

		this._activateGlobalEvents();
	}

	buildHTML()
	{
		return $(`
			<div class="app">
				<div class="content"></div>
				<div class="side-panel">
					<div class="tools"></div>
					<div class="all-tool-properties"></div>
				</div>
			</div>
		`);
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		this.contentHTML = this.html.find("> .content");
		this.sidePanelHTML = this.html.find("> .side-panel");
		this.toolsHTML = this.html.find("> .side-panel > .tools");
		this.allToolPropertiesHTML = this.html.find("> .side-panel > .all-tool-properties");

		this.tools[0] =	new FileTool(this, this.toolsHTML, this.allToolPropertiesHTML);
		this.tools[0].initialize();

		this.tools[1] =	new BrushTool(this, this.toolsHTML, this.allToolPropertiesHTML);
		this.tools[1].initialize();

		this.tools[2] =	new EraserTool(this, this.toolsHTML, this.allToolPropertiesHTML);
		this.tools[2].initialize();

		this.tools[0].isActive = true;

		this._activateEvents();
	}

	rotateSelectedRotationClockwise()
	{
		if(++this._selectedRotation >= 4)
		{
			this._selectedRotation = 0;
		}
	}

	rotateSelectedRotationAnticlockwise()
	{
		if(--this._selectedRotation < 0)
		{
			this._selectedRotation = 3;
		}
	}

	setPaletteColor(colorIndex, color)
	{
		const event = this.paletteChangeEvent.broadcast({
			colorIndex: colorIndex,
			color: color
		});

		this._palette[event.colorIndex] = event.color;
		this.grid.updateColor(event.colorIndex, event.color);
	}

	getPaletteColor(colorIndex)
	{
		return this._palette[colorIndex];
	}

	_activateGlobalEvents()
	{
		$(document).on("mouseup", (event) =>
		{
			this._isDragging = false;
		});

		$(document).on("keydown", (event) =>
		{
			switch(event.originalEvent.which)
			{
				case 16:
					this._isShiftPressed = true;
					break;

				case 17:
					this._isCTRLPressed = true;
					break;

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

		$(document).on("keyup", (event) =>
		{
			switch(event.originalEvent.which)
			{
				case 16:
					this._isShiftPressed = false;
					break;

				case 17:
					this._isCTRLPressed = false;
					break;
			}
		});

		$(document).on("keypress", (event) =>
		{
			if(!this._isCTRLPressed)
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
			}
		});
	}

	_activateEvents()
	{
		this.contentHTML.on("mousewheel", (event) =>
		{
			if(this._isCTRLPressed)
			{
				this._addZoom(event.originalEvent.wheelDelta);

				event.preventDefault();
			}

			/*const center = new Vector2D(this.contentHTML.width() / 2, this.contentHTML.height() / 2);

			if(event.originalEvent.wheelDelta > 0)
			{
				const offset = new Vector2D(this.offset.x, this.offset.y);
				offset.x = (this._contentCursorOffset.x - offset.x) * (this.zoom) * 0.000001;
				offset.y = (this._contentCursorOffset.y - offset.y) * (this.zoom) * 0.000001;
				this.offset = offset
			}
			else
			{
				const offset = new Vector2D(this.offset.x, this.offset.y);
				offset.x += (this._contentCursorOffset.x - center.x) * (this.zoom - zoomDifference) * 0.0001;
				offset.y += (this._contentCursorOffset.y - center.y) * (this.zoom - zoomDifference) * 0.0001;
				this.offset = offset
			}*/
		});

		this.sidePanelHTML.on("mousewheel", (event) =>
		{
			if(this._isCTRLPressed)
			{
				event.preventDefault();
			}
		});

		this.contentHTML.on("mousedown", (event) =>
		{
			switch(event.originalEvent.which)
			{
				case 2:
					this._dragOffset.x = this.offset.x - event.originalEvent.offsetX;
					this._dragOffset.y = this.offset.y - event.originalEvent.offsetY;
					this._isDragging = true;
					break;
			}
		});

		this.contentHTML.on("mousemove", (event) =>
		{
			if(this.isDragging)
			{
				this.offset = new Vector2D(event.originalEvent.offsetX + this._dragOffset.x, event.originalEvent.offsetY + this._dragOffset.y);
			}
		});

		this.contentHTML.on("mouseover", (event) =>
		{
			this._isMouseOnContent = true;
		});

		this.contentHTML.on("mouseleave", (event) =>
		{
			this._isMouseOnContent = false;
		});
	}

	_addZoom(zoomAdd)
	{
		this.zoom = Math.max(this.zoom - zoomAdd * this.zoom * this.zoomMultiplier, this.zoomMinimum);
	}
}
