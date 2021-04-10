import Transformations from "./transformations.js";
import MouseZoom from "./mouse-zoom.js";

export default class ZoomPanRenderer
{
	zooming;
	html;
	transformations;
	wheelDelta = 120;
	_cursorX = 0;
	_cursorY = 0;

	constructor(html)
	{
		this.html = html;
		this.transformations = new Transformations(0, 0, 0, 0, 1);

		$(document).on("mousemove", (event) =>
		{
			this._cursorX = event.originalEvent.pageX;
			this._cursorY = event.originalEvent.pageY;
		});

		this.html.on("mousewheel", (event) =>
		{
			this.addZoom(event.originalEvent.deltaY);

			return false;
		});
	}

	addZoom(amount)
	{
		if(typeof this.zooming === "undefined")
		{
			const offsetLeft = this.html.offset().left;
			const offsetTop = this.html.offset().top;
			const zooming = new MouseZoom(this.transformations, this._cursorX, this._cursorY, offsetLeft, offsetTop, -amount / this.wheelDelta);
			this.zooming = zooming;

			const transformations = zooming.zoom();
			this.applyTransformations(transformations);
			this.transformations = transformations;
			this.zooming = undefined;
		}
	}

	getTransform(transformations)
	{
		return `matrix(${transformations.scale.toFixed(1)}, 0, 0, ${transformations.scale.toFixed(1)}, ${transformations.translateX.toFixed(1)}, ${transformations.translateY.toFixed(1)})`;
	}

	applyTransformations(transformations)
	{
		const origin = transformations.originX.toFixed(10) + "px " + transformations.originY.toFixed(10) + "px";
		this.html.css("transform-origin", origin);
		this.html.css("-ms-transform-origin", origin);
		this.html.css("-o-transform-origin", origin);
		this.html.css("-moz-transform-origin", origin);
		this.html.css("-webkit-transform-origin", origin);

		const transform = this.getTransform(transformations);
		this.html.css("transform", transform);
		this.html.css("-ms-transform", transform);
		this.html.css("-o-transform", transform);
		this.html.css("-moz-transform", transform);
		this.html.css("-webkit-transform", transform);
	}
}
