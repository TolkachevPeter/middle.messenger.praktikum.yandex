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

	async getUserInfo(){
		return await this.userService.getUserInfo();
	}

}