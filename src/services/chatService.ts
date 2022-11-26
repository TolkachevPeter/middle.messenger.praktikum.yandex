import Request from './request';

interface Chat {
	id: number,
	title: string,
	avatar: string,
	unread_count: number,
	last_message: {
		user: {
			first_name: string,
			second_name: string,
			avatar: string,
			email: string,
			login: string,
			phone: string
		},
		time: Date,
		content: string
	}
}


export default class ChatService {
	request: Request;
	baseUrl: string;
	wssBaseUrl: string;


	constructor() {
		this.request = new Request();
		this.baseUrl = 'https://ya-praktikum.tech/api/v2';
		this.wssBaseUrl = 'wss://ya-praktikum.tech/ws/chats';
	}

	async getChats(): Promise<Chat[]> {
		let chats: Chat[];
		try {
			const res = await this.request.get(`${this.baseUrl}/chats`);
			chats = JSON.parse(res.response);
		} catch (error) {
			throw new Error(error);
		}
		return chats;
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
			throw new Error(error);
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
			throw new Error(error);
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

	createWsConnection(chatId: number, userId: number, wsToken: string, callback: (...args: any) => void):
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