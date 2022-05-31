import button from './button.tmpl';
import Handlebars from 'handlebars';
import './button.less';

const template = Handlebars.compile(button);

export default (buttonId, buttonText) =>
	template({ buttonId, buttonText });