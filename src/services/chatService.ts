import Request from './request';

export default class ChatService {
	request: Request;


	constructor(){
		this.request = new Request();
	}

	static getChats() {
		return [
            {
                id: 1,
                title: "чат",
                avatar: "avatar",
                unread_count: 1,
                first_name: "Peter",
                second_name: "Tolkachev",
                time: new Date().toLocaleTimeString(),
                content: "message",
            },
            // {
            //     name: "Peter",
            //     lastMessage: "Message",
            //     lastMessageTime: new Date().toLocaleTimeString(),
            // },
            // {
            //     name: "Ivan",
            //     lastMessage: "Верстка слегка скучна",
            //     lastMessageTime: "10:05",
            // },
            // {
            //     name: "review",
            //     lastMessage: window.location.href,
            //     lastMessageTime: new Date().toLocaleTimeString(),
            // },
        ];
	}
}