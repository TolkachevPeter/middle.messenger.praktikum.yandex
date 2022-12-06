import { baseUrl, wssBaseUrl } from '../config/config';
import { ChatContact } from '../types/types';
import Request from './request';

export default class ChatService {
	request: Request;
	baseUrl: string;
	wssBaseUrl: string;


	constructor() {
		this.request = new Request();
		this.baseUrl = baseUrl;
		this.wssBaseUrl = wssBaseUrl;
	}

	async getChats(): Promise<ChatContact[]> {
		let chats: ChatContact[];
		try {
			const res = await this.request.get(`${this.baseUrl}/chats`);
			chats = JSON.parse(res.response);
		} catch (error) {
			throw new Error(error);
		}
		return chats;
	}
	async addPersonsToChat(userIds: number[], chatId: number): Promise<void> {
		try {
			await this.request.put(`${this.baseUrl}/chats/users`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: { 
						users: userIds,
						chatId
					}
				}
			);
		} catch (error) {
			throw new Error(error);
		}
	}
	async deletePersonsToChat(userIds: number[], chatId: number): Promise<void> {
		try {
			await this.request.delete(`${this.baseUrl}/chats/users`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: { 
						users: userIds,
						chatId
					}
				}
			);
		} catch (error) {
			throw new Error(error);
		}
	}

	async createChat(title: string): Promise<void> {
		try {
			await this.request.post(`${this.baseUrl}/chats`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: { title }
				});
		} catch (error) {
			console.log(error);
		}
	}

	async removeChat(chatId: number): Promise<void> {
		try {
			await this.request.delete(`${this.baseUrl}/chats`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: { chatId }
				});
		} catch (error) {
			console.log(error);
		}
	}

	async getChatWsToken(chatId: number): Promise<string> {
		let wsToken: string;
		try{
			const res = await this.request.post(`${this.baseUrl}/chats/token/${chatId}`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				});
			wsToken = JSON.parse(res.responseText).token;

			if(!wsToken){
				throw new Error('No ws token found');
			} 
		} catch(error) {
			throw new Error(error);
		}
		return wsToken;
	}

	createWsConnection(chatId: number, userId: number, wsToken: string, callback: () => void):
    Promise<WebSocket> {
		return new Promise((resolve, reject) => {
			const server = new WebSocket(`${this.wssBaseUrl}/${userId}/${chatId}/${wsToken}`);
			server.onopen = () => {
				console.log('Соединение установлено');
				resolve(server);
			};
			server.onmessage = callback;
			server.onerror = (error) => reject(error);
			server.onclose = (event) => {
				if (event.wasClean) {
					console.log('Соединение закрыто чисто');
				} else {
					console.log('Обрыв соединения');
				}
				console.log(`Код: ${event.code} | Причина: ${event.reason}`);
			};
		});
	}
}
