import Handlebars from 'handlebars';
import profile from './user.tmpl';
import './user.less';
import { generateInput } from './modules/input';

Handlebars.registerPartial(
	'emailInputFieldProfile',
	generateInput('email', 'Email', '', 'text', 'pochta@yandex.ru')
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
	generateInput('phone', 'Phone', '', 'text', '+7 (909) 967 30 30')
);

const template = Handlebars.compile(profile);

export default () => template();
