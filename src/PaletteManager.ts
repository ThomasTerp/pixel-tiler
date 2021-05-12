import Emitter, {Event} from "./Emitter";

export class SetColorEvent extends Event
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

class Test {}

export default class PaletteManager
{
	public colors: Array<string>;
	public colorChangeEmitter: Emitter<SetColorEvent> = new Emitter<SetColorEvent>();
	private _defaultColor: string = "#ffffff";

	constructor(colors: Array<string> = [])
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
		const setColorEvent = this.colorChangeEmitter.emit(new SetColorEvent(colorID, color));

		this.colors[setColorEvent.colorID] = setColorEvent.color;
	}
}
