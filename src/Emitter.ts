
export class Event {}

export interface Callback<T>
{
	(event: T): void;
}

export default class Emitter<T extends Event = Event>
{
	_callbacks: Map<Callback<T>, boolean> = new Map<Callback<T>, boolean>();
	_postCallbacks: Map<Callback<T>, boolean> = new Map<Callback<T>, boolean>();

	on(onEmit: Callback<T>): void
	{
		this._callbacks.set(onEmit, true);
	}

	onPost(onEmit: Callback<T>): void
	{
		this._postCallbacks.set(onEmit, true);
	}

	off(onEmit: Callback<T>): void
	{
		this._callbacks.delete(onEmit);
	}

	offPost(onEmit: Callback<T>): void
	{
		this._postCallbacks.delete(onEmit);
	}

	once(onEmit: Callback<T>): void
	{
		this.on((event: T) =>
		{
			onEmit(event);
			this.off(onEmit);
		});
	}

	oncePost(onEmit: Callback<T>): void
	{
		this.onPost((event: T) =>
		{
			onEmit(event);
			this.offPost(onEmit);
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

	emitPost(event: Event = new Event()): T
	{
		const tEvent: T = event as T;

		for(const onEmit of Array.from(this._postCallbacks.keys()))
		{
			onEmit(tEvent);
		}

		return tEvent;
	}
}
