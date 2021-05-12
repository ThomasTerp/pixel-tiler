
export class Event {}

export interface Callback<T>
{
	(event: T): void;
}

export default class Emitter<T extends Event = Event>
{
	_callbacks: {[callbackID: number]: Callback<T>} = {};
	_callbackID: number = 0;

	on(onEmit: Callback<T>): number
	{
		this._callbacks[this._callbackID++] = onEmit;

		return this._callbackID;
	}

	off(callbackID: number): void
	{
		delete this._callbacks[callbackID];
	}

	once(onEmit: Callback<T>): number
	{
		const callbackID: number = this.on((event: T) =>
		{
			onEmit(event);
			this.off(callbackID);
		});

		return callbackID;
	}

	emit(event?: Event): T
	{
		if(typeof event === "undefined")
		{
			event = new Event();
		}

		for(const onEmit of Object.values(this._callbacks))
		{
			onEmit(event as T);
		}

		return event as T;
	}
}
