
export default class Vector2D
{
	x;
	y;

	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	copy()
	{
		return new Vector2D(this.x, this.y);
	}
}
