import Tool from "./tool.js";
import PaletteComponent from "./components/palette-component.js";

export default class FileTool extends Tool
{
	name = "File";

	constructor(app, containerHTML, propertiesContainerHTML)
	{
		super(app, containerHTML, propertiesContainerHTML);
	}

	buildPropertiesHTML()
	{
		const propertiesHTML = super.buildPropertiesHTML();
		propertiesHTML.append(`
			<div class="input">
				<label for="${this.unqiueID}-filename">Filename</label>
				<input id="${this.unqiueID}-filename" type="text" />
			</div>
			<div class="palette-container"></div>
			<div class="input">
				<input id=${this.unqiueID}-save" type="button" value="Save" style="width: 96%;" />
			</div>
			<div class="input">
				<input id=${this.unqiueID}-load" type="button" value="Load" style="width: 96%;" />
			</div>
		`);

		return propertiesHTML;
	}

	rebuildHTML()
	{
		super.rebuildHTML();

		this._paletteComponent = new PaletteComponent(this.app, this.propertiesHTML.find("> .palette-container"), false);
		this._paletteComponent.initialize();
	}
}
