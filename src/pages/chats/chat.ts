import chat from './chat.tmpl';
import './chat.less';
import './chat.less';
import Block from '../../commonClasses/Block';
import Input from '../../components/input/input';
import RenderHelper from '../../commonClasses/RenderHelper';
// import ChatService from '../../services/chatService';
import EventBus from '../../commonClasses/EventBus';
import Messages from '../../components/messages';
import ChatList from '../../components/chatList/chatList';
import ChatController from './chat.controller';

export default class Chat extends Block {
	chatContacts: any;
	localEventBus: any;
	renderAfterChatSelection: any;
	chatList: ChatList;
	messages: Messages;
	loginInput: Input;
	controller: ChatController;

	constructor() {
		super('div', {}, true);
	}
	chatSelect() {
		this.eventBus().emit('flow:render');
	}

	async componentDidMount() {
		this.controller = new ChatController();
		this.localEventBus = new EventBus();
		this.chatContacts = await this.controller.getChats();
		this.localEventBus.on('chatIsSelected', this.chatSelect.bind(this));
		this.chatList = new ChatList({
			chatContacts: this.chatContacts,
			localEventBus: this.localEventBus,
		});
		this.messages = new Messages();
	}

	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'chatList',
			this.chatList.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'messages',
			this.messages.renderAsHTMLString()
		);
		const templateHTML = renderHelper.generate(chat, {
			isChatSelected: this.chatList.isChatSelected,
		});
		return renderHelper.replaceElements(templateHTML, [
			this.chatList,
			this.messages,
		]);
	}
}
