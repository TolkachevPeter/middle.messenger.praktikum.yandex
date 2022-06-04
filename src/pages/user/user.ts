
import user from './user.tmpl';
import './user.less';
import Button from '../../components/button';
import Block from '../../commonClasses/Block';
import { Form } from '../../types/types';
import Input from '../../components/input/input';
import {
	emailCheck,
	loginCheck,
	nameOrSurnameCheck,
	passwordCheck,
	phoneCheck,
} from '../../global/regex';
import Link from '../../components/link';
import { navigateTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';
import UserService, { UserInfo } from '../../services/userService';

export default class User extends Block {
	button: Button;
	loginInput: Input;
	passwordInput: Input;
	linkToRegistration: Link;
	emailInput: Input;
	nameInput: Input;
	surnameInput: Input;
	phoneInput: Input;
	passwordSecondInput: Input;
	service: UserService;
	user: UserInfo;
	displayNameInput: Input;
	toChat: Button;
	constructor() {
		super('div');
	}

	componentDidMount() {
		this.service = new UserService();
		this.user = this.service.getUserInfo();
		this.loginInput = new Input({
			inputText: 'Login',
			inputPlaceholder: 'Login',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			inputValue: this.user.login,
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: loginCheck,
		});
		this.emailInput = new Input({
			inputText: 'Email',
			inputPlaceholder: 'Email',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: emailCheck,
			inputValue: this.user.email,
		});
		this.nameInput = new Input({
			inputText: 'Name',
			inputPlaceholder: 'Name',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			inputValue: this.user.first_name,
		});
		this.surnameInput = new Input({
			inputText: 'Surname',
			inputPlaceholder: 'Surname',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			inputValue: this.user.second_name,
		});
		this.displayNameInput = new Input({
			inputText: 'DisplayName',
			inputPlaceholder: 'DisplayName',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			inputValue: this.user.display_name,
		});
		this.phoneInput = new Input({
			inputText: 'Phone',
			inputPlaceholder: 'Phone',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: phoneCheck,
			inputValue: this.user.phone,
		});
		this.passwordInput = new Input({
			inputText: 'Password',
			inputPlaceholder: 'Password',
			inputStyle: 'userInputStyle',
			inputType: 'password',
			labelStyle: 'userLabelStyle',
			mediumMarginHorizontally: true,
			validation: passwordCheck,
		});
		this.button = new Button({
			buttonStyle: 'defaultButton',
			buttonText: 'Change user info',
			events: {
				click: this.onClickUser.bind(this),
			},
		});
		this.toChat = new Button({
			buttonStyle: 'roundButton',
			events: {
				click: this.onClickChat.bind(this),
			},
		});
	}

	onClickChat() {
		console.log('click to Chat');
		navigateTo('chatPage');
	}

	onClickUser() {
		const { userForm } = document.forms as Form;
		getFormData(userForm);
		this.getAllInputs().forEach((input) => {
			input.validateInput();
		});
		const isValidationPassed = this.getAllInputs()
			.map((inpField) => inpField.getIsInputValid())
			.every((isValidField) => isValidField);
		if (isValidationPassed) {
			navigateTo('chatPage');
		}
	}

	getAllInputs() {
		return [
			this.loginInput,
			this.emailInput,
			this.nameInput,
			this.surnameInput,
			this.phoneInput,
			this.passwordInput,
			this.displayNameInput,
		];
	}

	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'changeUserInfo',
			this.button.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'toChat',
			this.toChat.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'loginInput',
			this.loginInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'emailInput',
			this.emailInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'nameInput',
			this.nameInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'surnameInput',
			this.surnameInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'displayName',
			this.displayNameInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'phoneInput',
			this.phoneInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'passwordInput',
			this.passwordInput.renderAsHTMLString()
		);
		const templateHTML = renderHelper.generate(user);
		return renderHelper.replaceElements(templateHTML, [
			this.button,
			this.toChat,
			...this.getAllInputs(),
		]);
	}
}

export function getFormData(form: HTMLFormElement) {
	const formData: FormData = new FormData(form);
	const consoleData = [...formData.entries()].reduce(
		(prev: Record<string, any>, [k, v]) => {
			prev[k] = v;
			return prev;
		},
		{}
	);
	console.log(consoleData);
}



// function randomEmail() {
// 	const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
// 	let string = '';
// 	for (var ii = 0; ii < 15; ii++) {
// 		string += chars[Math.floor(Math.random() * chars.length)];
// 	}
// 	return `${string}"@gmail.com"`;

// }