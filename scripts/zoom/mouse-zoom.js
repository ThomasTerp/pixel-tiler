import Transformations from "./transformations.js";
import clamp from "./../clamp.js";

export default class MouseZoom
{
	transformations;
	offsetLeft;
	offsetTop;
	mouseX;
	mouseY;
	delta;
	deltaMultiplier = 0.32;
	scaleMinimum = 1;
	scaleMaximum = 10;

	constructor(transformations, mouseX, mouseY, offsetLeft, offsetTop, delta)
	{
		this.transformations = transformations;
		this.offsetLeft = offsetLeft;
		this.offsetTop = offsetTop;
		this.mouseX = mouseX;
		this.mouseY = mouseY;
		this.delta = delta;
	}

	zoom()
	{
		const previousScale = this.transformations.scale;
		const newScale = clamp(previousScale + this.delta * this.deltaMultiplier, this.scaleMinimum, this.scaleMaximum);

		var imageX = (this.mouseX - this.offsetLeft).toFixed(2);
		var imageY = (this.mouseY - this.offsetTop).toFixed(2);
		var prevOrigX = (this.transformations.originX * previousScale).toFixed(2);
		var prevOrigY = (this.transformations.originY * previousScale).toFixed(2);
		var translateX = this.transformations.translateX;
		var translateY = this.transformations.translateY;
		var newOrigX = imageX / previousScale;
		var newOrigY = imageY / previousScale;

		if((Math.abs(imageX - prevOrigX) > 1 || Math.abs(imageY - prevOrigY) > 1) && previousScale < this.scaleMaximum)
		{
			translateX = translateX + (imageX - prevOrigX) * (1 - 1 / previousScale);
			translateY = translateY + (imageY - prevOrigY) * (1 - 1 / previousScale);
		}
		else if (previousScale != 1 || imageX != prevOrigX && imageY != prevOrigY)
		{
			newOrigX = prevOrigX / previousScale;
			newOrigY = prevOrigY / previousScale;
		}

		return new Transformations(newOrigX, newOrigY, translateX, translateY, newScale);
	}
}
