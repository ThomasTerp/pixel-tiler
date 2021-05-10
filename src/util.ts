
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
