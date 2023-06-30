/* eslint-disable no-undef */
import { expect } from 'chai';
const sinon = require('sinon');

import Request from './request';

describe('Request', () => {
	describe('.get()', () => {
		it('должен отправлять GET запрос', () => {
			const request = new Request();
			const requestStub = sinon.stub(request, 'request');
			const expectedOptions = { method: 'GET' };

			request.get('http://localhost:123/test');

			sinon.assert.calledWith(requestStub, 'http://localhost:123/test', sinon.match(expectedOptions));
			sinon.assert.calledOnce(requestStub);
			expect(requestStub.returnValues[0]).to.be.a('undefined');

			requestStub.restore();
		});
	});

	describe('.post()', () => {
		it('должен отправлять POST запрос', () => {
			const request = new Request();
			const requestStub = sinon.stub(request, 'request');
			const expectedOptions = { method: 'POST' };

			request.post('http://localhost:123/test');

			sinon.assert.calledWith(requestStub, 'http://localhost:123/test', sinon.match(expectedOptions));
			sinon.assert.calledOnce(requestStub);
			expect(requestStub.returnValues[0]).to.be.a('undefined');

			requestStub.restore();
		});
	});

	describe('.put()', () => {
		it('должен отправлять PUT запрос', () => {
			const request = new Request();
			const requestStub = sinon.stub(request, 'request');
			const expectedOptions = { method: 'PUT' };

			request.put('http://localhost:123/test');

			sinon.assert.calledWith(requestStub, 'http://localhost:123/test', sinon.match(expectedOptions));
			sinon.assert.calledOnce(requestStub);
			expect(requestStub.returnValues[0]).to.be.a('undefined');

			requestStub.restore();
		});
	});

	describe('.delete()', () => {
		it('должен отправлять DELETE запрос', () => {
			const request = new Request();
			const requestStub = sinon.stub(request, 'request');
			const expectedOptions = { method: 'DELETE' };

			request.delete('http://localhost:123/test');

			sinon.assert.calledWith(requestStub, 'http://localhost:123/test', sinon.match(expectedOptions));
			sinon.assert.calledOnce(requestStub);
			expect(requestStub.returnValues[0]).to.be.a('undefined');

			requestStub.restore();
		});
	});
});
