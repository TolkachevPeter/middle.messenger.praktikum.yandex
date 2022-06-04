enum METHODS {
	'GET',
	'POST',
	'PUT',
	'DELETE',
};

function queryStringify(data: Record<string, any>): string {
	let queryString = '?';
	data.forEach((key: string) => {
		queryString += `${String(key)}=${String(data[key])}&`;
	});
	return queryString;
}

export default class Request {
	get(url: string, options?: Record<string, any>, timeout?: number) {
		return this.request(url, { ...options, method: METHODS.GET }, timeout);
	}
	put(url: string, options?: Record<string, any>, timeout?: number) {
		return this.request(url, { ...options, method: METHODS.PUT }, timeout);
	}
	post(url: string, options?: Record<string, any>, timeout?: number) {
		return this.request(url, { ...options, method: METHODS.POST }, timeout);
	}
	delete(url: string, options?: Record<string, any>, timeout?: number) {
		return this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			timeout
		);
	}

	request = (url: string, options: Record<string, any>, timeout = 5000) => {
		const { headers = {}, data, method } = options;
		return new Promise((resolve, reject) => {
			if (!method) {
				reject(new Error('No method provided for XHR'));
			}
			const xhr = new XMLHttpRequest();
			if (method === METHODS.GET) {
				const urlForGet = url + queryStringify(data);
				xhr.open(method, urlForGet);
			}
			xhr.onload = () => {
				resolve(xhr);
			};
			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});
			xhr.timeout = timeout;
			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;
			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}
