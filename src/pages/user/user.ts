import Handlebars from 'handlebars';
import profile from './user.tmpl';
import './user.less';
import { generateInput } from './modules/input';

Handlebars.registerPartial(
	'emailInputFieldProfile',
	generateInput('email', 'Email', '', 'text', randomEmail())
);
Handlebars.registerPartial(
	'loginInputFieldProfile',
	generateInput('login', 'Login', '', 'text', 'ivanivanov')
);
Handlebars.registerPartial(
	'nameInputFieldProfile',
	generateInput('name', 'Name', '', 'text', 'Ivan')
);
Handlebars.registerPartial(
	'surnameInputFieldProfile',
	generateInput('surname', 'Surname', '', 'text', 'Ivanov')
);
Handlebars.registerPartial(
	'visibleNameInputFieldProfile',
	generateInput('visibleName', 'Visible Name', '', 'text', 'Ivan')
);
Handlebars.registerPartial(
	'phoneInputFieldProfile',
	generateInput('phone', 'Phone', '', 'text', `+7 ${Math.floor(Math.random() * 1000000000)}`)
);

const template = Handlebars.compile(profile);

export default () => template();


function randomEmail() {
	const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
	let string = '';
	for (var ii = 0; ii < 15; ii++) {
		string += chars[Math.floor(Math.random() * chars.length)];
	}
	return `${string}"@gmail.com"`;

}