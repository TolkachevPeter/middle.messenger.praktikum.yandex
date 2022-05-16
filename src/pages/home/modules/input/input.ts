import inputField from './input.tmpl';
import Handlebars from 'handlebars';
import './input.less';

const template = Handlebars.compile(inputField);

export default (
	inputFieldId,
	inputFieldText,
	inputFieldPlaceholder = '',
	inputFieldType = 'text',
	inputFieldValue = ''
) =>
	template({
		inputFieldId,
		inputFieldText,
		inputFieldPlaceholder,
		inputFieldType,
		inputFieldValue,
	});
