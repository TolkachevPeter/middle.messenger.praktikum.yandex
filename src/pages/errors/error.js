import Handlebars from 'handlebars';
import error from './error.tmpl';
import './error.less';

const template = Handlebars.compile(error);

export default (errorCode, errorDescription) =>
	template({
		errorCode,
		errorDescription,
	});
