import UserService from '../../services/userService';
import { signInRequest } from '../../types/types';

export class LoginController {
	userService: UserService;
	constructor() {
		this.userService = new UserService;
	}

	async isUserLoggedIn(userCredentials: signInRequest): Promise<boolean> {
		const res = await this.userService.singIn(userCredentials);
		return res.responseText === 'OK';
	}
}