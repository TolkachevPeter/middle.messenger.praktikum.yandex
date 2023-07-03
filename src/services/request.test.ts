/* eslint-disable no-undef */
import { expect } from 'chai';
const sinon = require('sinon');

import Request from './request';

describe('Request', () => {

	const TEST_URL = 'http://localhost:123/test';
	
	describe('.get()', () => {
		it('должен отправлять GET запрос', () => {
			const request = new Request();
			const requestStub = sinon.stub(request, 'request');
			const expectedOptions = { method: 'GET' };

			request.get(TEST_URL);

			sinon.assert.calledWith(requestStub, TEST_URL, sinon.match(expectedOptions));
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

			request.post(TEST_URL);

			sinon.assert.calledWith(requestStub, TEST_URL, sinon.match(expectedOptions));
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

			request.put(TEST_URL);

			sinon.assert.calledWith(requestStub, TEST_URL, sinon.match(expectedOptions));
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

			request.delete(TEST_URL);

			sinon.assert.calledWith(requestStub, TEST_URL, sinon.match(expectedOptions));
			sinon.assert.calledOnce(requestStub);
			expect(requestStub.returnValues[0]).to.be.a('undefined');

			requestStub.restore();
		});
	});
});
