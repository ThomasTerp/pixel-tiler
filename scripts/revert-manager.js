
export default class RevertManager
{
	_currentRevertIndex = -1;
	_reverts = [];

	addRevert(revert)
	{
		this._reverts = this._reverts.slice(0, this._currentRevertIndex + 1);
		this._reverts.push(revert);
		this._currentRevertIndex = this._reverts.length - 1;
	}

	undo()
	{
		if(this._currentRevertIndex >= 0)
		{
			this._reverts[this._currentRevertIndex--].undo();
		}
	}

	redo()
	{
		if(this._currentRevertIndex < this._reverts.length - 1)
		{
			this._reverts[++this._currentRevertIndex].redo();
		}
	}
}
