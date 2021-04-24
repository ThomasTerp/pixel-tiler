
export default class EventObject
{
	_listenerID = -1;
	_listeners = {};

	constructor()
	{

	}

	startListening(onBroadcast)
	{
		this._listeners[++this._listenerID] = onBroadcast;

		return this._listenerID;
	}

	stopListening(listenerID)
	{
		delete self._listeners[listenerID];
	}

	listenOnce(onBroadcast)
	{
		const listenerID = this.startListening((event) =>
		{
			onBroadcast(event);
			this.stopListening(listenerID);
		});
	}

	broadcast(event)
	{
		if(typeof event === undefined)
		{
			event = {};
		}

		for(const onBroadcast of Object.values(this._listeners))
		{
			onBroadcast(event);
		}

		return event;
	}
}
