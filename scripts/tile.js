
export default class Tile
{
	buildSVG;

	constructor(buildSVG)
	{
		this.buildSVG = buildSVG;
	}

	buildHTML()
	{
		this.html = $(`<svg width="100px" height="100px" viewBox="0 0 100 100"></svg>`);

		return this.buildSVG(this.html);
	}
}
