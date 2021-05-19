
export class Event {}

export interface Callback<T>
{
	(event: T): void;
}

export default class Emitter<T extends Event = Event>
{
	_callbacks: Map<Callback<T>, boolean> = new Map<Callback<T>, boolean>();

	on(onEmit: Callback<T>): void
	{
		this._callbacks.set(onEmit, true);
	}

	off(onEmit: Callback<T>): void
	{
		this._callbacks.delete(onEmit);
	}

	once(onEmit: Callback<T>): void
	{
		this.on((event: T) =>
		{
			onEmit(event);
			this.off(onEmit);
		});
	}

	emit(event: Event = new Event()): T
	{
		const tEvent: T = event as T;

		for(const onEmit of Array.from(this._callbacks.keys()))
		{
			onEmit(tEvent);
		}

		return tEvent;
	}
}
