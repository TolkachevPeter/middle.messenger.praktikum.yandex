/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { SinonStub, stub } from 'sinon';
import Router from './router';

describe('Router', () => {
	let router: Router;
	let HomeControllerEmit: SinonStub<any[], any>;
	let HomeController: SinonStub<any[], any>;
	let ErrorControllerEmit: SinonStub<any[], any>;
	let ErrorController: SinonStub<any[], any>;

	before(() => {
		const dom = new JSDOM('<div id="app"></div>', {
			url: 'http://localhost:1234',
		});
		global.window = dom.window as unknown as Window & typeof globalThis;
		global.document = dom.window.document;

		router = new Router();
		HomeControllerEmit = stub().named('HomeEmit');
		HomeController = stub().returns({
			emit: HomeControllerEmit,
		});
		ErrorControllerEmit = stub().named('ErrorEmit');
		ErrorController = stub().returns({
			emit: ErrorControllerEmit,
		});

	});

	afterEach(() => {
		HomeControllerEmit.resetHistory();
		HomeController.resetHistory();
		ErrorControllerEmit.resetHistory();
		ErrorController.resetHistory();
	});


	describe('.use()', () => {
		it('должен возвращать экземпляр Router', () => {
			const result = router.use('/', HomeController as any);

			expect(result).to.eq(router);
		});
	});


	describe('.start()', () => {
		it('должен подписаться на событие onpopstate', () => {
			expect(window.onpopstate).to.be.null;

			router.start();

			expect(window.onpopstate).not.to.be.null;
		});

	});

});

