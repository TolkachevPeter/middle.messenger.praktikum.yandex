
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
	updateAvatar: Text;
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
		this.updateAvatar = new Text({
			text: 'Change avatar',
			textStyle: 'updateAvatar',
			events: {
				click: this.onClickAvatar.bind(this),
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

	async onClickAvatar(event: Event) {
		event?.preventDefault();
		console.log('что же ты не работаешь?!!!!');
		const avatarInput = document.getElementById('avatarInput')as HTMLInputElement;
		const avatarSubmit = document.getElementById('avatarFormSubmit');
		const myUserForm = document.getElementById('avatarForm') as HTMLFormElement;
		// myUserForm!.addEventListener('submit', event => {
		// 	event.preventDefault();
		// 	console.log('here');
		// });
		// myUserForm.addEventListener('submit', event => {

		// })

		// avatarInput!.onchange(()=> {

		// });
		// avatarInput!.onsubmit(event => {
		// 	console.log('gsddfs!!!');
		// });
		// }

		// avatarInput.onchange = async () => {
		// const { avatarForm } = document.forms as Form;
		// 	const form = new FormData(avatarForm);
		// 	console.log(form);
		// 	await this.controller.updateUserAvatar(form);
		// };
		// avatarSubmit!.onchange = async () => {
		// 	event.preventDefault();
		// };
		const sendAvatar = async (form: FormData) => await this.controller.updateUserAvatar(form);
		const updateUser = async (updatedData: UserInfo) => this.setProps(updatedData);
		myUserForm.onsubmit = async function(event) {
			event.preventDefault();
			// const fileList = this.filis as FileList;
			// const data = new FormData(this.files);
			// const { avatarForm } = document.forms as Form;
			// avatarForm.append('avatar', this.files);

			// const userData = getFormData(avatarForm) as UserInfo;
			const form = new FormData(myUserForm);


			// const formData = new FormData();
			// formData.append('avatar', this.files);
			// const value = Object.fromEntries(formData.entries());
			// console.log(formData);
			// console.log(value);

			const updateUserData: UserInfo = await sendAvatar(form);
			updateUser(updateUserData);

			// };
			// const host = 'https://ya-praktikum.tech';

			// fetch(`${host}/api/v2/user/profile/avatar`, {
			// 	method: 'PUT',
			// 	credentials: 'include', // Нам нужно подставлять cookies
			// 	// mode: 'cors', // Работаем с CORS
			// 	body: form,
			//   })
			// 	.then(response => response.json())
			// 	.then(data => {
			// 	  console.log(data);
			// 	  return data;
			// 	});
			


		};
		if(avatarInput){
			avatarInput!.click();
		}

		avatarInput.onchange = () => {
			event.preventDefault();
			avatarSubmit?.click();
		};
		// span[0].parentNode!.replaceChild(input, span[0]);
		// console.log('here', span[0].parentNode!);
		// const userData = getFormData(userForm) as UserInfo;
		// const updatedUserData = await this.controller.updateUserInfo(userData);
		// this.setProps(updatedUserData);
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
			'changeAvatar',
			this.updateAvatar.renderAsHTMLString()
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
			this.updateAvatar,
			this.toChat,
			this.avatar,
			this.logout,
			...this.getAllInputs(),
		]);
	}
}

