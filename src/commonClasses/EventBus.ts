/* eslint-disable no-unused-vars */
type CallBackFunction = (...args: any[]) => {};

export default class EventBus {
	listeners: Record<string, CallBackFunction[]>;
	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: CallBackFunction): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: CallBackFunction): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}

	emit(event: string, ...args: any[]): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach(function (listener) {
			listener(...args);
		});
	}
}
