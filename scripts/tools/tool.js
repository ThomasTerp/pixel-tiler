import HTMLObject from "../html-object.js";

export default class Tool extends HTMLObject
{
	name = "Tool";
	app;
	propertiesContainerHTML;
	_isActive = false;

	set isActive(value)
	{
		if(value)
		{
			for(const tool of this.app.tools)
			{
				tool.isActive = false;
			}

			this._activate();
		}
		else
		{
			this._deactivate();
		}

		this._isActive = value;
	}

	get isActive()
	{
		return this._isActive;
	}

	constructor(app, containerHTML, propertiesContainerHTML)
	{
		super(containerHTML);

		this.app = app;
		this.propertiesContainerHTML = propertiesContainerHTML;
	}

	initialize()
	{
		super.initialize();

		this.buildPropertiesHTML();
	}

	buildHTML()
	{
		return $(`<button class="tool">${this.name}</button>`);
	}

	buildPropertiesHTML()
	{
		return $(`
			<div class="tool-properties">
				<h1 class="tool-title">${this.name}</h1>
			</div>
		`);
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		if(typeof this.propertiesHTML !== "undefined")
		{
			this.propertiesHTML.remove();
		}

		this.propertiesHTML = this.buildPropertiesHTML();
		this.propertiesHTML.attr("id", `${this.uniqueID.toString()}-properties`);
		this.propertiesHTML.data("htmlObject", this);
		this.propertiesHTML.appendTo(this.propertiesContainerHTML);

		this._activateEvents();
	}

	_activateEvents()
	{
		this.html.on("mousedown", (event) =>
		{
			this.isActive = true;
		})
	}

	_activate()
	{
		this.propertiesHTML.show();
		this.html.addClass("active-tool");
	}

	_deactivate()
	{
		this.propertiesHTML.hide();
		this.html.removeClass("active-tool");
	}
}
