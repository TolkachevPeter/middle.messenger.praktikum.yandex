import { GenericObject } from './../../types/types';
import UserService from '../../services/userService';

export class LoginController {
	userService: UserService;
	constructor() {
		this.userService = new UserService;
	}

	async isUserLoggedIn(userCredentials: GenericObject): Promise<boolean> {
		const res = await this.userService.singIn(userCredentials);
		return res.responseText === 'OK';
	}

	async getUserInfo(): Promise<boolean>{
		const res = await this.userService.getUserInfo();
		return typeof res.id === 'number' && res.email ? true : false ;
	}
}
