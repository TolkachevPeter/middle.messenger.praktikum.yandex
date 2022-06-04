import Handlebars from 'handlebars';
import link from './link.tmpl';
import './link.less';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';

export default class Link extends Block{
	constructor(props: object | undefined) {
		super('div', props);
	}

	render() {
		const renderHelper = new RenderHelper();
		const template = Handlebars.compile(link);
		const templateHTML = template({
			linkStyle: this.props.linkStyle,
			linkText: this.props.linkText
		});
		return renderHelper.convertHtmlToDom(templateHTML);
	}
}
