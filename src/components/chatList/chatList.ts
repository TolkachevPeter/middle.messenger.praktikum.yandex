import Handlebars from 'handlebars';
import chatList from './chatList.tmpl';
import Block from '../../commonClasses/Block';
import './chatList.less';
import Link from '../link';
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
				click: this.onClickLinkToRemoveChat.bind(this),
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
		const { selectedChat } = this.props;
		if(selectedChat && selectedChat.props) {
			await this.controller.removeChat(selectedChat.props.id);
			const update = await this.controller.getChats();
			this.setProps({
				chatContacts: update,
				selectedChat: null
			});
		} else {
			console.log('Choose a chat');
		}
	}

	onClickLinkToProfile() {
		this.router.go('/settings');
	}

	onClickChatContact() {
		const { currentTarget } = event as Event;
		const select = currentTarget ? 
			this.chatContacts.find(el => el.getId() === (currentTarget as HTMLElement).getAttribute('data-id')) 
			: null;
		select && this.setProps({
			selectedChat: select
		});
		this.isChatSelected = true;
		this.localEventBus.emit('chatIsSelected', select);
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
				isSelected: this.props.selectedChat && this.props.selectedChat.props.id === chat.id,
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
