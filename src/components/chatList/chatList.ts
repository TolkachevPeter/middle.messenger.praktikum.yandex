import Handlebars from 'handlebars';
import chatList from './chatList.tmpl';
import Block from '../../commonClasses/Block';

import './chatList.less';

import Link from '../link';
import { navigateTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';
import Chat from '../../pages/chats/chat';
import EventBus from '../../commonClasses/EventBus';
import ChatContact from '../chatContact';

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
		super('div', props);
		this.isChatSelected = false;
		this.selectedChat = null;
		this.localEventBus = this.props.localEventBus;
	}

	componentDidMount() {
		this.linkToProfile = new Link({
			linkText: 'Profile',
			linkStyle: 'chatlist__link_profile',
			events: {
				click: this.onClickLinkToProfile.bind(this),
			},
		});
		this.renderHelper = new RenderHelper();
		this.chatContacts = this.buildChatContacts();
	}

	onClickLinkToProfile() {
		navigateTo('profilePage');
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
			...this.chatContacts,
		]);
	}
}
