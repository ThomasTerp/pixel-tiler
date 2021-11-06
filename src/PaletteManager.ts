import Emitter, {Event} from "./Emitter";

export class ColorChangeEvent extends Event
{
	colorID: number;
	color: string;

	constructor(colorID: number, color: string)
	{
		super();

		this.colorID = colorID;
		this.color = color;
	}
}

export class SelectedColorIDChangeEvent extends Event
{
	selectedColorID: number;

	constructor(selectedColorID: number)
	{
		super();

		this.selectedColorID = selectedColorID;
	}
}

export default class PaletteManager
{
	public colors: string[];
	public colorChangeEmitter: Emitter<ColorChangeEvent> = new Emitter<ColorChangeEvent>();
	public selectedColorIDChangeEmitter: Emitter<SelectedColorIDChangeEvent> = new Emitter<SelectedColorIDChangeEvent>();
	private _selectedColorID: number = 0;
	private _defaultColor: string = "#ffffff";

	set selectedColorID(colorID: number)
	{
		const selectedColorIDChangeEvent = this.selectedColorIDChangeEmitter.emit(new SelectedColorIDChangeEvent(colorID));
		this._selectedColorID = selectedColorIDChangeEvent.selectedColorID;
		this.selectedColorIDChangeEmitter.emitPost(selectedColorIDChangeEvent);
	}

	get selectedColorID()
	{
		return this._selectedColorID;
	}

	get selectedColor()
	{
		return this.colors[this.selectedColorID];
	}

	constructor(colors: string[] = [])
	{
		this.colors = colors;

		if(this.colors.length === 0)
		{
			this.addColor();
		}
	}

	addColor()
	{
		this.setColor(this.colors.length, this._defaultColor);
	}

	setColor(colorID: number, color: string)
	{
		const colorChangeEvent = this.colorChangeEmitter.emit(new ColorChangeEvent(colorID, color));
		this.colors[colorChangeEvent.colorID] = colorChangeEvent.color;
		this.colorChangeEmitter.emitPost(colorChangeEvent);
	}
}
