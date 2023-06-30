/* eslint-disable no-undef */
import { JSDOM } from 'jsdom';
import Block from './Block';
import { expect } from 'chai';


class TestBlock extends Block {
	constructor(props = {}, isFullPageHeight = false, isFullPageWidth = false) {
		super('div', props, isFullPageHeight, isFullPageWidth);
	}

	render() {
		const element = document.createElement('div');
		element.textContent = 'Test';
		return element;
	}
}

const dom = new JSDOM();
global.document = dom.window.document;

describe('Block', () => {
	let block: TestBlock;

	beforeEach(() => {
		block = new TestBlock();
	});

	it('Element is created with correct id', () => {
		expect(block.getElement().getAttribute('data-id')).equal(block.getId());
	});

	it('Element is hidden when hide is called', () => {
		block.hide();
		expect(block.getElement().style.display).equal('none');
	});

	it('Element is shown when show is called', () => {
		block.show();
		expect(block.getElement().style.display).equal('block');
	});


	it('Throws error when trying to access private prop', () => {
		expect(() => {
			// @ts-ignore
			// eslint-disable-next-line no-unused-vars
			const prop = block.props._privateProp;
		}).throw();
	});
});
