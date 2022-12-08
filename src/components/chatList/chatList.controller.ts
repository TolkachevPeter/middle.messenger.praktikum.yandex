import ChatService from '../../services/chatService';


export default class ChatListController {
	chatService: ChatService;

	constructor() {
		this.chatService = new ChatService();
	}

	async getChats() {
		return await this.chatService.getChats();
	}

	async createChat(title: string) {
		await this.chatService.createChat(title);
	}

	async removeChat(chatId: number) {
		await this.chatService.removeChat(chatId);
	}
}
