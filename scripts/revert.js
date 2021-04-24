
export default class Revert
{
	onUndo;
	onRedo;
	_isInUndoneState = false;

	constructor(callRedoimmediately, onUndo, onRedo)
	{
		this.onUndo = onUndo;
		this.onRedo = onRedo;

		if(callRedoimmediately)
		{
			this.onRedo();
		}
	}

	undo()
	{
		if(this._isInUndoneState)
		{
			throw new Error("Already in undone state");
		}

		this._isInUndoneState = true;

		return this.onUndo();
	}

	redo()
	{
		if(!this._isInUndoneState)
		{
			throw new Error("Already in redone state");
		}

		this._isInUndoneState = false;

		return this.onRedo();
	}
}
