
export default class RevertManager
{
	_currentRevertIndex = -1;
	_reverts = [];
	_lockLevel = 0;

	get isLocked()
	{
		return this._lockLevel > 0;
	}

	addRevert(revert)
	{
		this._reverts = this._reverts.slice(0, this._currentRevertIndex + 1);
		this._reverts.push(revert);
		this._currentRevertIndex = this._reverts.length - 1;
	}

	undo()
	{
		if(!this.isLocked && this._currentRevertIndex >= 0)
		{
			this._reverts[this._currentRevertIndex--].undo();
		}
	}

	redo()
	{
		if(!this.isLocked && this._currentRevertIndex < this._reverts.length - 1)
		{
			this._reverts[++this._currentRevertIndex].redo();
		}
	}

	lock()
	{
		this._lockLevel++;
	}

	unlock()
	{
		this._lockLevel--;
	}
}
