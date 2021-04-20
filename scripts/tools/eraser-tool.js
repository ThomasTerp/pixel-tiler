import Tool from "./tool.js";
import Vector2D from "./../vector-2d.js";
import getElementsAtPosition from "./../get-elements-at-position.js";

export default class EraserTool extends Tool
{
	name = "Eraser";
	_isErasing = false;

	get isErasing()
	{
		return this._isErasing;
	}

	constructor(app, containerHTML, propertiesContainerHTML)
	{
		super(app, containerHTML, propertiesContainerHTML)
	}

	initialize()
	{
		super.initialize();

		this._activateGlobalEvents();
	}

	rebuildHTML()
	{
		super.rebuildHTML();
	}

	buildPropertiesHTML()
	{
		const propertiesHTML = super.buildPropertiesHTML();
		//propertiesHTML.append("<span>Eraser</span>");

		return propertiesHTML;
	}

	_activateGlobalEvents()
	{
		$(document).on("mouseup", (event) =>
		{
			if(this.isActive)
			{
				this._isErasing = false;
			}
		});

		this.app.contentHTML.on("mousedown", (event) =>
		{
			if(this.isActive)
			{
				switch(event.originalEvent.which)
				{
					case 1:
						const position = new Vector2D(event.originalEvent.offsetX, event.originalEvent.offsetY);

						this._isErasing = true;
						this._erase(position, true);

						break;
				}
			}
		});

		this.app.contentHTML.on("mousemove", (event) =>
		{
			if(this.isActive && this.isErasing)
			{
				this._erase(new Vector2D(event.originalEvent.offsetX, event.originalEvent.offsetY));
			}
		});
	}

	_deactivate()
	{
		super._deactivate();

		this._isErasing = false;
	}

	_removeTileHTMLs(position)
	{
		for(const element of getElementsAtPosition(position))
		{
			const elementHTML = $(element);

			if(elementHTML.hasClass("tile-pointer"))
			{
				const tileHTML = elementHTML.parent();

				//TODO: Check grid size
				//TODO: Check rotation
				//TODO: Fix _lastDrawnGridPosition when 0, 0
				if(true)
				{
					tileHTML.remove();
				}
			}
		}
	}

	_erase(position, override)
	{
		this._removeTileHTMLs(position);
	}
}
