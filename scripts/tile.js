import parseSVG from "./parse-svg.js";

export default class Tile
{
	buildSVG;

	constructor(buildSVG)
	{
		this.buildSVG = buildSVG;
	}

	buildHTML(svgMode, size, position, color, rotation)
	{
		return parseSVG(`<svg><${svgMode ? "svg" : "g"} width="${size}px" height="${size}px" viewBox="0,0 ${size},${size}" style="transform-origin: ${size / 2}px ${size / 2}px; transform: translate(${position.x}px, ${position.y}px) rotate(${rotation * 90}deg);">${this.buildSVG(size, color)}<rect class="tile-pointer" x="0" y="0" width="${size}px" height="${size}px" fill="none" /></${svgMode ? "svg" : "g"}></svg>`);
	}
}
