import { baseUrl } from '../config/config';
import { GenericObject, singUpUserData, UserInfo } from '../types/types';
import Request from './request';

export default class UserService {
	request: Request;
	baseUrl: string;
	constructor() {
		this.request = new Request();
		this.baseUrl = baseUrl;
	}

	async getUserInfo(): Promise<UserInfo> {
		let user: UserInfo;
		try {
			const res = await this.request.get(`${this.baseUrl}/auth/user`);
			user = JSON.parse(res.response);

			if(!user){
				throw new Error('User not found');
			}
		} catch (e) {
			throw new Error(`Error getting user info: ${e.message}`);
		}
		console.log('user', user);
		return user;
	}
	async getPersonByLogin(login: string): Promise<UserInfo> {
		let user: UserInfo;
		try {
			const res = await this.request.post(`${this.baseUrl}/user/search`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: {
						login
					}
				});
			user = JSON.parse(res.response);

			if(!user){
				throw new Error('User not found');
			}
		} catch (e) {
			throw new Error(`Error getting user info: ${e.message}`);
		}
		console.log('user', user);
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
			console.error(`Error sing up: ${error.message}`);
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
			const res = await this.request.put(`${this.baseUrl}/user/profile`,
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
	async updateUserAvatar(data: FormData) {
		let newUserAvatar;
		const addData = 'fet' as any;
		try {
			const res = await this.request.püt(`${this.baseUrl}/user/profile/avatar`,
				{
					credentials: 'include',
					body: data
				},
				addData 
			);
			newUserAvatar = await res.json();

			if(!newUserAvatar){
				throw new Error('newUserAvatar not found');
			}
		} catch (e) {
			throw new Error(`Error updateing profileUser info: ${e.message}`);
		}
		return newUserAvatar;
	}

	async logOut(): Promise<void> {
		try{
			await this.request.post(`${this.baseUrl}/auth/logout`);
		} catch (e) {
			console.error(`Error logging out: ${e.message}`);
		}
	}
}
