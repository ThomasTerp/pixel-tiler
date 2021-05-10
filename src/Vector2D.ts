
export default class Vector2D
{
	x: number;
	y: number;

	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

	add(other: Vector2D): Vector2D;
	add(other: number): Vector2D;
	add(other: any): Vector2D
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

		return this;
	}

	subtract(other: Vector2D): Vector2D
	subtract(other: number): Vector2D
	subtract(other: any): Vector2D
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

		return this;
	}

	multiply(other: Vector2D): Vector2D;
	multiply(other: number): Vector2D;
	multiply(other: any): Vector2D
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

		return this;
	}

	divide(other: Vector2D): Vector2D;
	divide(other: number): Vector2D;
	divide(other: any): Vector2D
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

		return this;
	}

	equal(other: Vector2D): boolean
	{
		return this.x === other.x && this.y === other.y;
	}

	copy(): Vector2D
	{
		return new Vector2D(this.x, this.y);
	}
}
