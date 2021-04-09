
export default class HTMLObject
{
	containerHTML;
	html;

	constructor(containerHTML)
	{
		this.containerHTML = containerHTML;
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

		this.html.data("htmlObject", this);
		this.containerHTML.append(this.html);
	}

	buildHTML()
	{
		throw new Error("buildHTML needs to be overridden");
	}
}
