
export default class Vector2D
{
	x;
	y;

	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}

	multiply(other)
	{
		if(typeof other === "number")
		{
			this.x *= other;
			this.y *= other;
		}
		else if(other instanceof Vector2)
		{
			this.x *= other.x;
			this.y *= other.y;
		}
		else
		{
			throw new Error("Can only multiply by a number or another Vector2D");
		}

		return this;
	}

	divide(other)
	{
		if(typeof other === "number")
		{
			this.x /= other;
			this.y /= other;
		}
		else if(other instanceof Vector2)
		{
			this.x /= other.x;
			this.y /= other.y;
		}
		else
		{
			throw new Error("Can only divide by a number or another Vector2D");
		}

		return this;
	}

	equal(other)
	{
		return this.x === other.x && this.y === other.y;
	}

	copy()
	{
		return new Vector2D(this.x, this.y);
	}
}
