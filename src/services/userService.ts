import Request from './request';

export type UserInfo = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
}
export default class UserService {
	request: Request;
	constructor() {
		this.request = new Request();
	}

	public getUserInfo(): UserInfo {
		return {
			id: 123,
			first_name: 'Peter',
			second_name: 'Tolkachev',
			display_name: 'Peter Tolkachev',
			login: 'peterTolkachev',
			email: 'peter.tolkachev@gmail.com',
			phone: '89161140121',
			avatar: '/path/to/avatar.jpg',
		};
	}
}
