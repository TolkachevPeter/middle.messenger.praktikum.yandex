import login from './login.tmpl';
import './login.less';
import Button from '../../components/button';
import Block from '../../commonClasses/Block';
import { Form } from '../../types/types';
import Input from '../../components/input/input';
import { loginCheck, passwordCheck } from '../../global/regex';
import Link from '../../components/link';
import { navigateTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';

export default class Login extends Block {
	button: Button;
	loginInput: Input;
	passwordInput: Input;
	linkToRegistration: Link;
	constructor() {
		super('div');
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
			labelStyle: 'loginLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: loginCheck,
		});
		this.passwordInput = new Input({
			inputText: 'Password',
			inputPlaceholder: 'Password',
			inputStyle: 'loginInputStyle',
			inputType: 'password',
			labelStyle: 'loginLabelStyle',
			mediumMarginHorizontally: true,
			validation: passwordCheck,
		});
		this.linkToRegistration = new Link({
			linkText: 'Registration',
			linkStyle: 'link-registration',
			events: {
				click: this.onClickLinkToRegistration.bind(this),
			},
		});
	}

	onClickSignIn() {
		console.log('clickSignIn');
		event!.preventDefault();
		const { loginForm } = document.forms as Form;
		getFormData(loginForm);
		this.loginInput.validateInput();
		this.passwordInput.validateInput();
		if (
			(this.loginInput.getIsInputValid(),
			this.passwordInput.getIsInputValid())
		) {
			navigateTo('chatPage');
		}
	}

	onClickLinkToRegistration() {
		console.log('click Registration');
		navigateTo('registrationPage');
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
