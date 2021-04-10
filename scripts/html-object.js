import generateUniqueID from "./generate-unique-id.js";

export default class HTMLObject
{
	containerHTML;
	html;
	_uniqueID;

	get uniqueID()
	{
		return this._uniqueID;
	}

	constructor(containerHTML)
	{
		this.containerHTML = containerHTML;
		this._uniqueID = `object${generateUniqueID()}`;
	}

	initialize()
	{
		this.rebuildHTML();
	}

	rebuildHTML()
	{
		if(typeof this.html !== "undefined")
		{
			this.html.remove();
		}

		this.html = this.buildHTML();
		this.html.attr("id", this.uniqueID.toString());

		this.html.data("htmlObject", this);
		this.containerHTML.append(this.html);
	}

	buildHTML()
	{
		throw new Error("buildHTML needs to be overridden");
	}
}
