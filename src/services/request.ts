import { GenericObject } from '../types/types';


const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

type Options = {
  headers: Record<string, string>,
  data?: GenericObject,
  method: string,
  withCredentials: boolean
}

export default class Request {
	get(url: string, options?: any, timeout?: number) {
		return this.request(url, { ...options, method: METHODS.GET }, timeout);
	}
	put(url: string, options?: any, timeout?: number) {
		return this.request(url, { ...options, method: METHODS.PUT }, timeout);
	}
	post(url: string, options?: any, timeout?: number) {
		return this.request(url, { ...options, method: METHODS.POST }, timeout);
	}
	delete(url: string, options?: any, timeout?: number) {
		return this.request(url, { ...options, method: METHODS.DELETE }, timeout);
	}

	request = (url: string, options: any, timeout = 5000): Promise<XMLHttpRequest> => {
		const {
			headers = {}, data, method,
		} = options as Options;
		return new Promise((resolve, reject) => {
			if (!method) {
				reject(new Error('No method provided for XHR'));
			}
			const xhr = new XMLHttpRequest();
			if (method === METHODS.GET && data) {
				const urlForGet = url + queryStringify(data);
				xhr.open(method, urlForGet);
			} else {
				xhr.open(method, url);
			}
			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});
			xhr.timeout = timeout;
			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;
			xhr.withCredentials = true;
			xhr.onload = () => {
				const { status } = xhr;
				if (status === 0 || (status >= 200 && status < 400)) {
					// The request has been completed successfully
					resolve(xhr);
				} else {
					const parsedError = JSON.parse(xhr.response);
					reject(new Error(`Failed to request data: ${xhr.status} ${parsedError.statusText} ${parsedError.reason}`));
				}
			};
			if (method === METHODS.GET) {
				xhr.send();
			} else {
				xhr.send(queryStringify(data || {}));
			}
		});
	};
}


function queryStringify(data: any): string | never {
	if (!isObject(data)) {
		throw new Error('input must be an object.');
	}
	let res = '';
	// eslint-disable-next-line no-restricted-syntax
	for (const [key, val] of Object.entries(data)) {
		if (typeof val === 'undefined') {
		// eslint-disable-next-line no-continue
			continue;
		} else if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
			res += `${key}=${encodeURIComponent(String(val))}&`;
		} else if (isObject(val)) {
			res += `${key}${stringifyObjectDeep(val)}&`;
		} else if (isArray(val)) {
			res += `${stringifyArray(key, val)}&`;
		}
	}
	return removeLastChar(res);
}

export function isObject(val: unknown): val is GenericObject {
	return (
		typeof val === 'object'
		&& val != null
		&& val.constructor === Object
		&& Object.prototype.toString.call(val) === '[object Object]');
}

export function isArray(val: unknown): val is [] {
	return Array.isArray(val);
}

function stringifyObjectDeep(obj: GenericObject): string {
	let res = '';
	// eslint-disable-next-line no-restricted-syntax
	for (const [key, val] of Object.entries(obj)) {
		if (isObject(val)) {
			res += `[${key}]${stringifyObjectDeep(val)}&`;
		} else if (isArray(val)) {
			res += `${stringifyArray(key, val)}&`;
		} else {
			res += `[${key}]=${encodeURIComponent(String(val))}&`;
		}
	}
	return removeLastChar(res);
}
  

function stringifyArray(key: string, arr: []): string {
	let res = '';
	arr.forEach((el, ind) => {
		res += `${key}[${ind}]=${el}&`;
	});
	return removeLastChar(res);
}

function removeLastChar(s: string): string {
	return s.substring(0, s.length - 1);
}
  