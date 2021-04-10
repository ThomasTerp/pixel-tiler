
export default class Transformations
{
	originX;
	originY;
	translateX;
	translateY;
	scale;

	constructor(originX, originY, translateX, translateY, scale)
	{
		this.originX = originX;
		this.originY = originY;
		this.translateX = translateX;
		this.translateY = translateY;
		this.scale = scale;
	}
}
