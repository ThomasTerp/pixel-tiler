import Component from "./component-base.js";
import Vector2D from "./../../vector-2d.js";

export default class PaletteComponent extends Component
{
	_ignoreNextSelectedColorChange = false;

	constructor(app, containerHTML)
	{
		super(app, containerHTML);
	}

	buildHTML()
	{
		const paletteHTML = $(`<div class="palette"></div>`);

		for(const [colorIndex, color] of this.app.palette.entries())
		{
			const paletteColorHTML = $(`<input class="palette-color" type="color" value="${color}" />`);
			paletteColorHTML.attr("color-index", colorIndex);

			if(this.app.selectedColor === colorIndex)
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

	_activateEvents()
	{
		this.html.on("click", ".palette-color", (event) =>
		{
			const paletteColorHTML = $(event.currentTarget);

			this._setSelectedPaletteColorHTML(paletteColorHTML, true);

			if(paletteColorHTML.data("allow-click") === true)
			{
				paletteColorHTML.data("allow-click", false);
			}
			else
			{
				event.preventDefault();
			}
		});

		this.html.on("dblclick", ".palette-color", (event) =>
		{
			const paletteColorHTML = $(event.currentTarget);
			paletteColorHTML.data("allow-click", true);
			paletteColorHTML.click();
		});

		this.html.on("contextmenu", ".palette-color", (event) =>
		{
			const paletteColorHTML = $(event.currentTarget);
			paletteColorHTML.data("allow-click", true);
			paletteColorHTML.click();

			event.preventDefault();
		});

		this.html.on("change", ".palette-color", (event) =>
		{
			const paletteColorHTML = $(event.currentTarget);
			this.app.setPaletteColor(paletteColorHTML.attr("color-index"), paletteColorHTML.val());
		});

		this.app.selectedColorChangeEvent.startListening((event) =>
		{
			event.selectedColor = 0;

			this._setSelectedPaletteColorHTML(this.html.find(`> .palette-color[color-index="${event.selectedColor}"]`), false);
		});
	}

	_setSelectedPaletteColorHTML(paletteColorHTML, isGlobal)
	{
		if(isGlobal)
		{
			this.app.selectedColor = paletteColorHTML.attr("color-index");
		}

		this.html.find(".palette-color").removeClass("selected-palette-color");
		paletteColorHTML.addClass("selected-palette-color");
	}
}
