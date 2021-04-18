
export default function parseSVG(svg)
{
	const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
	div.innerHTML= svg;

	const fragment = document.createDocumentFragment();
	fragment.appendChild(div.firstChild.firstChild);

	return fragment;
}
