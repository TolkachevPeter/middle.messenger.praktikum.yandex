import Handlebars from 'handlebars';
import text from './text.tmpl';
import './link.less';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';

export default class Link extends Block {
	constructor(props: object | undefined) {
		super('div', props);
	}

	render() {
		const renderHelper = new RenderHelper();
		const template = Handlebars.compile(text);
		const templateHTML = template({
			textStyle: this.props.textStyle,
			text: this.props.text,
		});
		return renderHelper.convertHtmlToDom(templateHTML);
	}
}
