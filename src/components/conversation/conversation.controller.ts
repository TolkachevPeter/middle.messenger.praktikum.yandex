import ChatService from '../../services/chatService';
import UserService from '../../services/userService';
import { UserInfo } from '../../types/types';

export default class ConversationController {
	userService: UserService;
	chatService: ChatService;

	constructor() {
		this.userService = new UserService();
		this.chatService = new ChatService();
	}

	async getUserInfo():Promise<UserInfo>{
		return await this.userService.getUserInfo();
	}
	async getPersonByLogin(login: string):Promise<UserInfo>{
		return await this.userService.getPersonByLogin(login);
	}
	async addPersonToChat(personIds: number[], chatId: number){
		return await this.chatService.addPersonsToChat(personIds, chatId);
	}
	async deletePersonToChat(personIds: number[], chatId: number){
		return await this.chatService.deletePersonsToChat(personIds, chatId);
	}

	async createWs(chatId: number, userId: number, callback: () => void): Promise<WebSocket | undefined> {
		try {
			const token = await this.chatService.getChatWsToken(chatId);
			return await this.chatService.createWsConnection(chatId, userId, token, callback);
		} catch (e) {
			console.error(e);
		}
	}

}
