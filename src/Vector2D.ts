
export default class Vector2D
{
	x: number;
	y: number;

	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

	add(other: Vector2D | number)
	{
		if(typeof other === "number")
		{
			this.x += other;
			this.y += other;
		}
		else if(other instanceof Vector2D)
		{
			this.x += other.x;
			this.y += other.y;
		}
		else
		{
			throw new Error("Can only multiply by a number or another Vector2D");
		}

		return this;
	}

	subtract(other: Vector2D | number)
	{
		if(typeof other === "number")
		{
			this.x -= other;
			this.y -= other;
		}
		else if(other instanceof Vector2D)
		{
			this.x -= other.x;
			this.y -= other.y;
		}
		else
		{
			throw new Error("Can only multiply by a number or another Vector2D");
		}

		return this;
	}

	multiply(other: Vector2D | number)
	{
		if(typeof other === "number")
		{
			this.x *= other;
			this.y *= other;
		}
		else if(other instanceof Vector2D)
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

	divide(other: Vector2D | number)
	{
		if(typeof other === "number")
		{
			this.x /= other;
			this.y /= other;
		}
		else if(other instanceof Vector2D)
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

	equal(other: Vector2D)
	{
		return this.x === other.x && this.y === other.y;
	}

	copy()
	{
		return new Vector2D(this.x, this.y);
	}
}
