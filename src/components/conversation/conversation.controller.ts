import ChatService from '../../services/chatService';
import UserService from '../../services/userService';

export default class ConversationController {
	userService: UserService;
	chatService: ChatService;

	constructor() {
		this.userService = new UserService();
		this.chatService = new ChatService();
	}

	async getUserInfo(){
		return await this.userService.getUserInfo();
	}

	async createWs(chatId: number, userId: number, callback: (...args: any) => void): Promise<WebSocket | undefined> {
		try {
			const token = await this.chatService.getChatWsToken(chatId);
			return await this.chatService.createWsConnection(chatId, userId, token, callback);
		} catch (e) {
			console.error(e);
		}
	}

}