import ChatService from '../../services/chatService';

export default class ChatController {
	chatService: ChatService;

	constructor() {
		this.chatService = new ChatService();
	}

	async getChats() {
		return await this.chatService.getChats();
	}
}
