
export default class Revert
{
	onUndo;
	onRedo;
	_isInRedoState = false;

	constructor(onUndo, onRedo)
	{
		this.onUndo = onUndo;
		this.onRedo = onRedo;

		this.redo();
	}

	undo()
	{
		if(!this._isInRedoState)
		{
			throw new Error("Already in undo state");
		}

		this._isInRedoState = false;

		return this.onUndo();
	}

	redo()
	{
		if(this._isInRedoState)
		{
			throw new Error("Already in redo state");
		}

		this._isInRedoState = true;

		return this.onRedo();
	}
}
