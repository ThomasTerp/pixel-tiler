import Component from "./component-base.js";
import Vector2D from "./../../vector-2d.js";

export default class PaletteComponent extends Component
{
	isSelectable;
	_ignoreNextSelectedColorChange = false;

	constructor(app, containerHTML, isSelectable)
	{
		super(app, containerHTML);

		this.isSelectable = isSelectable;
	}

	initialize()
	{
		super.initialize();

		this._activateGlobalEvents();
	}

	buildHTML()
	{
		const paletteHTML = $(`<div class="palette"></div>`);

		for(const [colorIndex, color] of this.app.palette.entries())
		{
			const paletteColorHTML = $(`<input class="palette-color" type="color" value="${color}" />`);
			paletteColorHTML.attr("color-index", colorIndex);

			if(this.isisSelectable && this.app.selectedColor === colorIndex)
			{
				paletteColorHTML.addClass("selected-palette-color");
			}

			paletteHTML.append(paletteColorHTML);
		}

		return paletteHTML
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		this._activateEvents();
	}

	_activateGlobalEvents()
	{
		this.app.selectedColorChangeEvent.startListening((event) =>
		{
			if(this.isSelectable)
			{
				this.html.find(".palette-color").removeClass("selected-palette-color");
				this.html.find(`> .palette-color[color-index="${event.selectedColor}"]`).addClass("selected-palette-color");
			}
		});

		this.app.paletteChangeEvent.startListening((event) =>
		{
			this.html.find(`> .palette-color[color-index="${event.colorIndex}"]`).val(event.color);
		});
	}

	_activateEvents()
	{
		this.html.on("click", ".palette-color", (event) =>
		{
			if(this.isSelectable)
			{
				const paletteColorHTML = $(event.currentTarget);

				this.app.selectedColor = parseInt(paletteColorHTML.attr("color-index"));

				if(paletteColorHTML.data("allow-click") === true)
				{
					paletteColorHTML.data("allow-click", false);
				}
				else
				{
					event.preventDefault();
				}
			}
		});

		this.html.on("dblclick", ".palette-color", (event) =>
		{
			if(this.isSelectable)
			{
				const paletteColorHTML = $(event.currentTarget);
				paletteColorHTML.data("allow-click", true);
				paletteColorHTML.click();
			}
		});

		this.html.on("contextmenu", ".palette-color", (event) =>
		{
			const paletteColorHTML = $(event.currentTarget);

			if(this.isSelectable)
			{
				paletteColorHTML.data("allow-click", true);
			}

			paletteColorHTML.click();

			event.preventDefault();
		});

		this.html.on("change", ".palette-color", (event) =>
		{
			const paletteColorHTML = $(event.currentTarget);
			this.app.setPaletteColor(parseInt(paletteColorHTML.attr("color-index")), paletteColorHTML.val());
		});
	}
}
