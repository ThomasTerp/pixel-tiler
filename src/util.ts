import Vector2D from "./Vector2D";

export function isPowerOfTwo(x: number): boolean
{
	return (Math.log(x) / Math.log(2)) % 1 === 0;
}

let ids: {[prefix: string]: number} = {};
export function generateUniqueID(prefix: string): string
{
	if(!(prefix in ids))
	{
		ids[prefix] = 0;
	}

    return `${prefix}${ids[prefix]++}`;
}

export function clamp(value: number, min: number, max: number): number
{
	return Math.min(Math.max(value, min), max);
}

export function conditionalClass(className: string, condition: boolean): string
{
	return condition ? className : "";
}

export function getElementsAtPosition(position: Vector2D)
{
	const stack: Element[] = []
	let element: Element | null;

	do
	{
		element = document.elementFromPoint(position.x, position.y);

		if(element == null)
		{
			break;
		}

		stack.push(element);
		element.classList.add("pointer-events-none");
	}
	while(element.tagName !== "HTML");

	for(var i: number  = 0; i < stack.length; i += 1)
	{
		stack[i].classList.remove("pointer-events-none");
	}

	return stack;
}
