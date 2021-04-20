import HTMLObject from "../../html-object.js";

export default class Component extends HTMLObject
{
	app;

	constructor(app, containerHTML)
	{
		super(containerHTML);

		this.app = app;
	}
}
