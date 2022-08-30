import UserService, { UserInfo } from '../../services/userService';

export default class UserController {
	userService: UserService;
	constructor() {
		this.userService = new UserService();
	}

	async getUserInfo(){
		return await this.userService.getUserInfo();
	}

	async logOut(){
		await this.userService.logOut();
	}

	async updateUserInfo(data: UserInfo){
		return await this.userService.updateUserInfo(data);
	}

}