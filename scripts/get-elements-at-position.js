import createCSSSelector from "./create-css-selector.js";

createCSSSelector(".pointer-events-none", "pointer-events: none;");

export default function getElementsAtPosition(position)
{
	const stack = []
	let element;

	do
	{
		element = document.elementFromPoint(position.x, position.y);
		stack.push(element);
		element.classList.add("pointer-events-none");
	}
	while(element.tagName !== "HTML");

	for(var i  = 0; i < stack.length; i += 1)
	{
		stack[i].classList.remove("pointer-events-none");
	}

	return stack;
}
