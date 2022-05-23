import Request from "./request";

export default class ChatService {
    request: Request;

    constructor() {
        this.request = new Request();
    }

    getUserInfo() {
        return {
            id: 123,
            first_name: "Peter",
            second_name: "Tolkachev",
            display_name: "Peter Tolkachev",
            login: "peterTolkachev",
            email: "peter.tolkachev@gmail.com",
            phone: "89161140121",
            avatar: "/path/to/avatar.jpg",
        };
    }
}
