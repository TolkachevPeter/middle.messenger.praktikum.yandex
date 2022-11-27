import login from './login.tmpl';
import './login.less';
import Button from '../../components/button';
import Block from '../../commonClasses/Block';
import { Form } from '../../types/types';
import Input from '../../components/input/input';
import { loginCheck, passwordCheck } from '../../global/regex';
import Link from '../../components/link';
// import { navigateTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';
import Router from '../../services/router';
import { LoginController } from './login.controller';
import getFormData from '../../utils/getFormData';

export default class Login extends Block {
	button: Button;
	loginInput: Input;
	passwordInput: Input;
	linkToRegistration: Link;
	router: Router;
	controller: LoginController;
	login: string;
	pswd: string;
	isLoggedIn: boolean;
	constructor() {
		super('div');
		this.router = new Router();
		this.controller = new LoginController();
		this.login = '';
		this.pswd = '';
		this.isLoggedIn = false;
	}

	componentDidMount() {
		this.button = new Button({
			buttonStyle: 'defaultButton',
			buttonText: 'Sign in',
			events: {
				click: this.onClickSignIn.bind(this),
			},
		});
		this.loginInput = new Input({
			inputText: 'Login',
			inputPlaceholder: 'Login',
			inputStyle: 'loginInputStyle',
			inputType: 'login',
			labelStyle: 'loginLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: loginCheck,
			isValid: true
		});
		this.passwordInput = new Input({
			inputText: 'Password',
			inputPlaceholder: 'Password',
			inputStyle: 'loginInputStyle',
			inputType: 'password',
			labelStyle: 'loginLabelStyle',
			mediumMarginHorizontally: true,
			validation: passwordCheck,
			isValid: true
		});
		this.linkToRegistration = new Link({
			linkText: 'Registration',
			linkStyle: 'link-registration',
			events: {
				click: this.onClickLinkToRegistration.bind(this),
			},
		});
	}

	async onClickSignIn() {
		event!.preventDefault();
		const loginForm = (document.forms as Form).loginForm;
		// const loginValid = this.loginInput.validateInput();
		const isValidation = this.loginInput.getIsInputValid()
		&& this.passwordInput.getIsInputValid();
		this.passwordInput.validateInput();
		this.loginInput.validateInput();
		const formData = getFormData(loginForm);
		this.isLoggedIn = await this.controller.isUserLoggedIn(formData);
		if (isValidation
		&& this.isLoggedIn
		) {
			this.router.go('/messenger');
		}
	}

	onClickLinkToRegistration() {
		console.log('click Registration');
		this.router.go('/sign-up');
	}

	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'signInButton',
			this.button.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'loginInput',
			this.loginInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'passwordInput',
			this.passwordInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'linkToRegistration',
			this.linkToRegistration.renderAsHTMLString()
		);
		const templateHTML = renderHelper.generate(login);
		return renderHelper.replaceElements(templateHTML, [
			this.button,
			this.loginInput,
			this.passwordInput,
			this.linkToRegistration,
		]);
	}
}

