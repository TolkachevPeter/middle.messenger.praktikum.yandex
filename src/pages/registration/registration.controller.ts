import { singUpUserData } from './../../types/types';
import UserService from '../../services/userService';

export default class RegistrationController {
	userService: UserService;
	constructor() {
		this.userService = new UserService();
	}

	async signUp(userData: singUpUserData){
		return await this.userService.singUp(userData);
	}

}