import Request from './request';

export default class ChatService {
	request: Request;


	constructor(){
		this.request = new Request();
	}

	getChats() {
		return [
            {
                name: "Peter",
                lastMessage: "Message",
                lastMessageTime: new Date().toLocaleTimeString(),
            },
            {
                name: "Ivan",
                lastMessage: "Верстка слегка скучна",
                lastMessageTime: "10:05",
            },
            {
                name: "review",
                lastMessage: window.location.href,
                lastMessageTime: new Date().toLocaleTimeString(),
            },
        ];
	}
}