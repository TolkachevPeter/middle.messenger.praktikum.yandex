import ChatService from '../../services/chatService';


export default class ChatController {
	chatService: ChatService;

	constructor() {
		this.chatService = new ChatService();
	}

	async getChats() {
		console.log('data', await this.chatService.getChats());
		return await this.chatService.getChats();
	}
}
