import HTMLObject from "../html-object.js";

export default class Tool extends HTMLObject
{
	app;
	propertiesContainerHTML;
	name;

	constructor(app, containerHTML, propertiesContainerHTML, name)
	{
		super(containerHTML);

		this.app = app;
		this.propertiesContainerHTML = propertiesContainerHTML;
		this.name = name;
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
		return $(`<div class="tool-properties"></div>`);
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
	}
}
