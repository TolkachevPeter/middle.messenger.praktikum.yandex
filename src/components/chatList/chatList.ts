import Handlebars from 'handlebars';
import chatList from './chatList.tmpl';
import Block from '../../commonClasses/Block';

import './chatList.less';

import Link from '../link';
// import { navigateTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';
import Chat from '../../pages/chats/chat';
import EventBus from '../../commonClasses/EventBus';
import ChatContact from '../chatContact';
import Router from '../../services/router';
import ChatListController from './chatList.controller';

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
	router: Router;
	controller: ChatListController;
	linkToNewChat: Link;
	linkToRemoveChat: Link;


	constructor(props: ChatListProps) {
		super('div', props);
		this.isChatSelected = false;
		this.selectedChat = null;
		this.localEventBus = this.props.localEventBus;
		this.router = new Router();
		this.controller = new ChatListController();
	}

	componentDidMount() {
		this.linkToProfile = new Link({
			linkText: 'Profile',
			linkStyle: 'chatlist__link_profile',
			events: {
				click: this.onClickLinkToProfile.bind(this),
			},
		});
		this.linkToNewChat = new Link({
			linkText: 'New chat',
			linkStyle: 'chatlist__link_profile chatlist__new-chat',
			events: {
				click: this.onClickLinkToCreateChat.bind(this),
			},
		});
		this.linkToRemoveChat = new Link({
			linkText: 'Remove chat',
			linkStyle: 'chatlist__link_profile chatlist__new-chat',
			events: {
				click: this.onClickLinkToCreateChat.bind(this),
			},
		});
		this.renderHelper = new RenderHelper();
		this.chatContacts = this.buildChatContacts();
	}

	componentDidUpdate(): void {
		this.chatContacts = this.buildChatContacts();
	}

	async onClickLinkToCreateChat(){
		await this.controller.createChat('title');
		const update = await this.controller.getChats();
		this.setProps({chatContacts: update});
	}
	async onClickLinkToRemoveChat(){
		// await this.controller.createChat(title || 'title');
		// const update = await this.controller.getChats();
		// this.setProps({chatContacts: update});
	}

	onClickLinkToProfile() {
		this.router.go('/settings');
	}

	onClickChatContact() {
		console.log('click contact');
		this.isChatSelected = true;
		this.localEventBus.emit('chatIsSelected');
	}

	buildChatContacts() {
		const chatContacts: ChatContact[] = [];
		this.props.chatContacts.forEach((chat: Chat, index: number) => {
			const chatContact = new ChatContact({
				...chat,
				index,
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
			'linkToProfile',
			this.linkToProfile.renderAsHTMLString()
		);
		Handlebars.registerPartial(
			'linkToCreateNewChat',
			this.linkToNewChat.renderAsHTMLString()
		);
		Handlebars.registerPartial(
			'linkToRemoveChat',
			this.linkToRemoveChat.renderAsHTMLString()
		);
		Handlebars.registerPartial(
			'chatContacts',
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
			this.linkToNewChat,
			this.linkToRemoveChat,
			...this.chatContacts,
		]);
	}
}
