
import user from './user.tmpl';
import './user.less';
import Button from '../../components/button';
import Block from '../../commonClasses/Block';
import { Form, UserInfo } from '../../types/types';
import Input from '../../components/input/input';
import {
	emailCheck,
	loginCheck,
	nameOrSurnameCheck,
	phoneCheck,
} from '../../global/regex';
import Link from '../../components/link';
import Text from '../../components/text';
import RenderHelper from '../../commonClasses/RenderHelper';
import Router from '../../services/router';
import UserController from './user.controller';
import getFormData from '../../utils/getFormData';
import { baseUrl } from '../../config/config';

export default class User extends Block {
	button: Button;
	loginInput: Input;
	linkToRegistration: Link;
	emailInput: Input;
	nameInput: Input;
	surnameInput: Input;
	phoneInput: Input;
	passwordSecondInput: Input;
	user: UserInfo;
	displayNameInput: Input;
	toChat: Button;
	router: Router;
	controller: UserController;
	logout: Text;
	updateUser: Text;
	updatePassword: Text;
	avatar: Button;
	constructor() {
		super('div');
		this.router = new Router();
	}

	async componentDidMount() {
		this.controller = new UserController();
		this.user = await this.controller.getUserInfo();
		this.loginInput = new Input({
			inputText: 'login',
			inputPlaceholder: 'Login',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			inputValue: this.user.login,
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: loginCheck,
			isValid: true,
		});
		this.emailInput = new Input({
			inputText: 'email',
			inputPlaceholder: 'Email',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: emailCheck,
			inputValue: this.user.email,
			isValid: true,
		});
		this.nameInput = new Input({
			inputText: 'first_name',
			inputPlaceholder: 'Name',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			inputValue: this.user.first_name,
			isValid: true,
		});
		this.surnameInput = new Input({
			inputText: 'second_name',
			inputPlaceholder: 'Surname',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			inputValue: this.user.second_name,
			isValid: true,
		});
		this.displayNameInput = new Input({
			inputText: 'display_name',
			inputPlaceholder: 'DisplayName',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: nameOrSurnameCheck,
			inputValue: this.user.display_name,
			isValid: true,
		});
		this.phoneInput = new Input({
			inputText: 'phone',
			inputPlaceholder: 'Phone',
			inputStyle: 'userInputStyle',
			labelStyle: 'userLabelStyle',
			readOnly: false,
			mediumMarginHorizontally: true,
			validation: phoneCheck,
			inputValue: this.user.phone,
			isValid: true,
		});
		this.toChat = new Button({
			buttonStyle: 'roundButton',
			events: {
				click: this.onClickChat.bind(this),
			},
		});
		this.avatar = new Button({
			buttonStyle: '',
			// events: {
			// 	click: this.onClickAvatar.bind(this),
			// },
		});
		this.logout = new Text({
			textStyle: 'profileConfigs__logout',
			text: 'Logout',
			events: {
				click: this.onClickLogout.bind(this),
			},
		});
		this.updateUser = new Text({
			text: 'Change user info',
			events: {
				click: this.onClickUser.bind(this),
			},
		});
		this.updatePassword = new Text({
			text: 'Change password',
			events: {
				click: this.onClickPassword.bind(this),
			},
		});
	}

	onClickChat() {
		this.router.go('/messenger');
	}
	onClickPassword() {
		this.router.go('/404');
	}

	async onClickUser() {
		const { userForm } = document.forms as Form;
		this.getAllInputs().forEach((input) => {
			input.validateInput();
		});
		const isValidationPassed = this.getAllInputs()
			.map((inpField) => inpField.getIsInputValid())
			.every((isValidField) => isValidField);
		if (isValidationPassed) {
			const userData = getFormData(userForm) as UserInfo;
			const updatedUserData = await this.controller.updateUserInfo(userData);
			this.setProps(updatedUserData);
		}
	}

	getAllInputs() {
		return [
			this.loginInput,
			this.emailInput,
			this.nameInput,
			this.surnameInput,
			this.phoneInput,
			this.displayNameInput,
		];
	}

	async onClickLogout() {
		await this.controller.logOut();
		this.router.go('/');
	}

	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'toChat',
			this.toChat.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'avatarUrl',
			this.avatar.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'logout',
			this.logout.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'changeUserInfo',
			this.updateUser.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'changePassword',
			this.updatePassword.renderAsHTMLString()
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
		const templateHTML = renderHelper.generate(user, 
			{displayName: this.user.display_name 
			|| this.user.first_name + ' ' + this.user.second_name,
			avatarUrl: baseUrl + '/resources/' + this.user.avatar});
		return renderHelper.replaceElements(templateHTML, [
			this.updateUser,
			this.updatePassword,
			this.toChat,
			this.avatar,
			this.logout,
			...this.getAllInputs(),
		]);
	}
}

