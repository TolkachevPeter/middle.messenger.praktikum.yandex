import Handlebars from 'handlebars';
import chatList from './chatList.tmpl';
import Block from '../../commonClasses/Block';

import './chatList.less';

import Link from '../link';
import { navTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';
import Chat from '../../pages/chats/chat';
import EventBus from '../../commonClasses/EventBus';
import ChatContact from '../chatContact';

// // Handlebars.registerPartial('searchField', generateSearchField());

// // const template = Handlebars.compile(chatList);

// export default class ChatList extends Block {
//     localEventBus: any;
//     isSelected: boolean;
//     selected: number;
//     search: string;
//     profileLink: Link;
// 	chatContact: { name: string; lastMessage: string; lastMessageTime: string; }[];

//     constructor(props) {
//         super("div", props);
//         this.localEventBus = this.props.localEventBus;
//         this.isSelected = false;
//         this.selected = 0;
//     }

//     componentDidMount() {
//         this.search = generateSearchField();
//         this.profileLink = new Link({
//             linkText: "Profile",
//             linkStyle: "chatlist__link_profile",
//             events: {
//                 click: this.onClickProfile.bind(this),
//             },
//         });
//     }

//     onClickProfile() {
//         navTo("profilePage");
//     }

// 	    render() {
//         const renderHelper = new RenderHelper();
//         // renderHelper.registerPartial(
//         //     "search",
//         //     this.search.renderAsHTMLString()
//         // );
//         renderHelper.registerPartial(
//             "profileLink",
//             this.profileLink.renderAsHTMLString()
//         );
//         // renderHelper.registerPartial(
//         //     "chatContact",
//         //     this.chatContact.renderAsHTMLString()
//         // );
//         const templateHTML = renderHelper.generate(chatList);
//         return renderHelper.replaceElements(templateHTML, [
//             this.profileLink,
//         ]);
//     }
// }

type ChatListProps = {
    chatContacts: Chat[];
    localEventBus: EventBus;
};

export default class ChatList extends Block {
    linkToProfile: Link;
    chatContacts: ChatContact[];
    renderHelper: RenderHelper;
    isChatSelected: boolean;
    selectedChat: number | null;
    localEventBus: EventBus;

    constructor(props: ChatListProps) {
        super("div", props);
        this.isChatSelected = false;
        this.selectedChat = null;
        this.localEventBus = this.props.localEventBus;
    }

    componentDidMount() {
        this.linkToProfile = new Link({
            linkText: "Profile",
            linkStyle: "chatlist__link_profile",
            events: {
                click: this.onClickLinkToProfile.bind(this),
            },
        });
        this.renderHelper = new RenderHelper();
        this.chatContacts = this.buildChatContacts();
    }

    onClickLinkToProfile() {
        navTo("profilePage");
    }

    onClickChatContact() {
        this.isChatSelected = true;
        this.localEventBus.emit("chatIsSelected");
    }

    buildChatContacts() {
        const chatContacts: ChatContact[] = [];
        this.props.chatContacts.forEach((chat: Chat) => {
            const chatContact = new ChatContact({
                ...chat,
                events: {
                    click: this.onClickChatContact.bind(this),
                },
            });
            chatContacts.push(chatContact);
        });
        return chatContacts;
    }

    render() {
        Handlebars.registerPartial(
            "linkToProfile",
            this.linkToProfile.renderAsHTMLString()
        );
        Handlebars.registerPartial(
            "chatContacts",
            this.chatContacts
                .map((chatContact: ChatContact) =>
                    chatContact.renderAsHTMLString()
                )
                .join()
        );
        const template = Handlebars.compile(chatList);
        const templateHTML = template({
            chatContacts: this.props.chatContacts,
        });
        return this.renderHelper.replaceElements(templateHTML, [
            this.linkToProfile,
            ...this.chatContacts,
        ]);
    }
}
