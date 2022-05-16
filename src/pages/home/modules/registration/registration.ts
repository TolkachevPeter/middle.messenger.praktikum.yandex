import Handlebars from 'handlebars';
import registration from './registration.tmpl';
import './registration.less';
import { generateButton } from '../../../../components/button';
import { generateInpField } from '../input/index.js';

Handlebars.registerPartial(
	'completeRegistration',
	generateButton('navToChats', 'Complete registration')
);
Handlebars.registerPartial(
	'loginInputFieldReg',
	generateInpField('login', 'Login', 'Login')
);
Handlebars.registerPartial(
	'emailInputFieldReg',
	generateInpField('email', 'Email', 'Email')
);
Handlebars.registerPartial(
	'nameInputFieldReg',
	generateInpField('name', 'Name', 'Name')
);
Handlebars.registerPartial(
	'surnameInputFieldReg',
	generateInpField('surname', 'Surname', 'Surname')
);
Handlebars.registerPartial(
	'phoneInputFieldReg',
	generateInpField('phone', 'Phone', 'Phone')
);
Handlebars.registerPartial(
	'passwordInputFieldReg',
	generateInpField('password', 'Password', 'Password', 'password')
);
Handlebars.registerPartial(
	'passwordAgainInputFieldReg',
	generateInpField(
		'passwordAgain',
		'Password (again)',
		'Password (again)',
		'password'
	)
);

const template = Handlebars.compile(registration);

export default () => template();
