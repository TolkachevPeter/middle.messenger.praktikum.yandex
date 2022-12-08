import registration from './registration.tmpl';
import './registration.less';
import Button from '../../components/button';
import Block from '../../commonClasses/Block';
import { Form, singUpUserData } from '../../types/types';
import Input from '../../components/input/input';
import {
	emailCheck,
	loginCheck,
	nameOrSurnameCheck,
	passwordCheck,
	phoneCheck,
} from '../../global/regex';
import Link from '../../components/link';
import RenderHelper from '../../commonClasses/RenderHelper';
import Router from '../../services/router';
import getFormData from '../../utils/getFormData';
import RegistrationController from './registration.controller';

export default class Login extends Block {
	button: Button;
	loginInput: Input;
	passwordInput: Input;
	emailInput: Input;
	nameInput: Input;
	surnameInput: Input;
	phoneInput: Input;
	passwordSecondInput: Input;
	linkToLogin: Link;
	router: Router;
	controller: RegistrationController;
	isLoggedIn: boolean;
	constructor() {
		super('div');
		this.router = new Router();
		this.controller = new RegistrationController();
		this.isLoggedIn = false;
	}

	componentDidMount() {
		this.button = new Button({
			buttonStyle: 'defaultButton',
			buttonText: 'Complete registration',
			events: {
				click: this.onClickRegistration.bind(this),
			},
		});
		this.loginInput = new Input({
			inputText: 'login',
			inputPlaceholder: 'Login',
			inputStyle: 'registrationInputStyle',
			labelStyle: 'registrationLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: loginCheck,
			isValid: true
		});
		this.emailInput = new Input({
			inputText: 'email',
			inputPlaceholder: 'Email',
			inputStyle: 'registrationInputStyle',
			labelStyle: 'registrationLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: emailCheck,
			isValid: true
		});
		this.nameInput = new Input({
			inputText: 'first_name',
			inputPlaceholder: 'Name',
			inputStyle: 'registrationInputStyle',
			labelStyle: 'registrationLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			isValid: true
		});
		this.surnameInput = new Input({
			inputText: 'second_name',
			inputPlaceholder: 'Surname',
			inputStyle: 'registrationInputStyle',
			labelStyle: 'registrationLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			isValid: true
		});
		this.phoneInput = new Input({
			inputText: 'phone',
			inputPlaceholder: 'Phone',
			inputStyle: 'registrationInputStyle',
			labelStyle: 'registrationLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: phoneCheck,
			isValid: true
		});
		this.passwordInput = new Input({
			inputText: 'password',
			inputPlaceholder: 'Password',
			inputStyle: 'loginInputStyle',
			inputType: 'password',
			labelStyle: 'loginLabelStyle',
			mediumMarginHorizontally: true,
			validation: passwordCheck,
			isValid: true
		});
		this.passwordSecondInput = new Input({
			inputText: 'password',
			inputPlaceholder: 'Password',
			inputStyle: 'loginInputStyle',
			inputType: 'password',
			labelStyle: 'loginLabelStyle',
			mediumMarginHorizontally: true,
			validation: passwordCheck,
			isValid: true
		});
		this.linkToLogin = new Link({
			linkText: 'Sign In',
			linkStyle: 'link-signin',
			events: {
				click: this.onClickLinkToSignIn.bind(this),
			},
		});
	}

	onClickLinkToSignIn() {
		this.router.go('/');
	}

	async onClickRegistration() {
		event!.preventDefault();
		const { registrationForm } = document.forms as Form;
		const formData = getFormData(registrationForm) as singUpUserData;
		this.getAllInputs().forEach((input) => {
			input.validateInput();
		});
		const isValidationPassed = this.getAllInputs()
			.map((inpField) => inpField.getIsInputValid())
			.every((isValidField) => isValidField);
		
		if (isValidationPassed) {
			await this.controller.signUp(formData);

			this.router.go('/messenger');
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
			this.passwordSecondInput,
		];
	}

	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'completeRegistration',
			this.button.renderAsHTMLString()
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
			'phoneInput',
			this.phoneInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'passwordInput',
			this.passwordInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'passwordSecondInput',
			this.passwordSecondInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'linkToLogin',
			this.linkToLogin.renderAsHTMLString()
		);
		const templateHTML = renderHelper.generate(registration);
		return renderHelper.replaceElements(templateHTML, [
			this.button,
			this.linkToLogin,
			...this.getAllInputs(),
		]);
	}
}
