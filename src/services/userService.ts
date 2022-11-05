import { GenericObject, singUpUserData, UserInfo } from '../types/types';
import Request from './request';


export default class UserService {
	request: Request;
	baseUrl: string;
	constructor() {
		this.request = new Request();
		this.baseUrl = 'https://ya-praktikum.tech/api/v2';
	}

	async getUserInfo(): Promise<UserInfo> {
		let user: UserInfo;
		try {
			const res = await this.request.get(`${this.baseUrl}/auth/user`);
			console.log('RES!!!', res);
			user = JSON.parse(res.response);

			if(!user){
				throw new Error('User not found');
			}
		} catch (e) {
			throw new Error(`Error getting user info: ${e.message}`);
		}
		return user;
	}

	async singUp(data: singUpUserData) {
		try {
			await this.request.post(`${this.baseUrl}/auth/signUp`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data
				});
		} catch(error){
			throw new Error(`Error sing up: ${error.message}`);
		}
	}

	async singIn(data: GenericObject): Promise<XMLHttpRequest> {
		let request: XMLHttpRequest;

		try {
			request = await this.request.post(`${this.baseUrl}/auth/singIn`, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data
			});

			if(!request) {
				throw new Error('Request not found');
			}
		} catch(error){
			throw new Error(`Error sing in: ${error.message}`);
		}

		return request;
	}

	async updateUserInfo(data: UserInfo): Promise<UserInfo> {
		let newUserData: UserInfo;
		try {
			const res = await this.request.put(`${this.baseUrl}/auth/profile`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data
				}
			);
			newUserData = JSON.parse(res.responseText);

			if(!newUserData){
				throw new Error('NewUserData not found');
			}
		} catch (e) {
			throw new Error(`Error updateing profileUser info: ${e.message}`);
		}
		return newUserData;
	}

	async logOut(): Promise<void> {
		try{
			await this.request.post(`${this.baseUrl}/auth/logout`);
		} catch (e) {
			throw new Error(`Error logging out: ${e.message}`);
		}
	}
}
