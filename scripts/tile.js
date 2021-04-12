
function parseSVG(svg)
{
	const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
	div.innerHTML= svg;

	const fragment = document.createDocumentFragment();
	fragment.appendChild(div.firstChild);

	return fragment;
}

export default class Tile
{
	buildSVG;

	constructor(buildSVG)
	{
		this.buildSVG = buildSVG;
	}

	buildHTML(size)
	{
		return parseSVG(`<svg width="${size}px" height="${size}px" viewBox="0,0 ${size},${size}">${this.buildSVG(size)[0].outerHTML}</svg>`);
	}
}
