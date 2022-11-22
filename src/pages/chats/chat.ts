import chat from './chat.tmpl';
import './chat.less';
import './chat.less';
import Block from '../../commonClasses/Block';
import Input from '../../components/input/input';
import RenderHelper from '../../commonClasses/RenderHelper';
// import ChatService from '../../services/chatService';
import EventBus from '../../commonClasses/EventBus';
import Conversation from '../../components/conversation';
import ChatList from '../../components/chatList/chatList';
import ChatController from './chat.controller';

export default class Chat extends Block {
	chatContacts: any;
	localEventBus: any;
	renderAfterChatSelection: any;
	chatList: ChatList;
	conversation: Conversation;
	// messages: Messages;
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
		this.localEventBus.on('chatIsSelected', this.chatIsSelected.bind(this));

		this.localEventBus.on('onNewMessage', this.onNewMessage.bind(this));
		this.chatList = new ChatList({
			chatContacts: this.chatContacts,
			localEventBus: this.localEventBus,
		});
		this.conversation = new Conversation({
			localEventBus: this.localEventBus,
		});
	}

	async onNewMessage(){
		this.chatList.setProps({
			chatContacts: await this.controller.getChats()
		})
	}

	chatIsSelected(){
		this.setProps({
			isChatSelected: true,
		});
		this.conversation.setProps({
			chatId: this.chatList.props.selectedChat.getId()
		});
		}

	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'chatList',
			this.chatList.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'messages',
			this.conversation.renderAsHTMLString()
		);
		const templateHTML = renderHelper.generate(chat, {
			isChatSelected: this.chatList.isChatSelected,
		});
		return renderHelper.replaceElements(templateHTML, [
			this.chatList,
			this.conversation,
		]);
	}
}
