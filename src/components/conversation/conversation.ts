import conversationTmpl from './conversation.tmpl';
import './conversation.less';
import Button from '../../components/button';
import Block from '../../commonClasses/Block';
import { Form, UserInfo } from '../../types/types';
import Input from '../../components/input/input';
import RenderHelper from '../../commonClasses/RenderHelper';
import getFormData from '../../utils/getFormData';
import ConversationController from './conversation.controller';
import { noEmptyStringCheck } from '../../global/regex';
import Message from '../messages';
import EventBus from '../../commonClasses/EventBus';
import { isArray, isObject } from '../../services/request';
import Text from '../../components/text';


type ConversationProps = {
	chatId?: number,
	localEventBus: EventBus,
	messages?: Message[]
  }

export type RwMessage = {
	id: number,
	user_id: number,
	chat_id: number,
	type: string,
	time: Date,
	content: string,
	is_read: boolean,
	file?: null
}

export default class Conversation extends Block {
	controller: ConversationController;
	user: UserInfo;
	props: ConversationProps;
	messageInput: Input;
	submitMessageButton: Button;
	messages: Message[];
	wss: WebSocket;
	rwMessages: RwMessage[];
	searchPerson: Text;
	removePerson: Text;

	constructor(props: ConversationProps) {
		super('div', props, false, true);
	}

	async componentDidMount() {
		this.controller = new ConversationController();
		this.user = await this.controller.getUserInfo();
		this.messages = [];
		this.rwMessages = [];

		this.messageInput = new Input({
			inputPlaceholder: 'Message',
			inputType: 'text',
			inputStyle: 'form-message__inputfield_style_default',
			mediumMarginHorizontally: true,
			validation: noEmptyStringCheck,
			isLabelEnabled: false,
			isValid: true
		});
		this.submitMessageButton = new Button({
			buttonStyle: 'button_style_round-arrow-right',
			events: {
				submit: this.onSubmitMessage.bind(this),
				click: this.onSubmitMessage.bind(this),
			},
		});
		this.searchPerson = new Text({
			text: 'add person to chat',
			events: {
				click: this.onClickAddPerson.bind(this),
			},
		});
		this.removePerson = new Text({
			text: 'remove person from chat',
			events: {
				click: this.onClickRemovePerson.bind(this),
			},
		});
	}

	async onClickAddPerson(){
		let personLogin = prompt('Please enter person login', '');
		if(personLogin) {
			const userInfo = await this.controller.getPersonByLogin(personLogin);
			if(userInfo && userInfo[0]?.id && this.props.chatId) {
				const personId = [userInfo[0].id as number];
				this.controller.addPersonToChat(personId, this.props.chatId);
			} else {
				console.error('person id not found');
				alert('person id not found');
			}
		}
	}
	async onClickRemovePerson(){
		let personLogin = prompt('Please enter person login', '');
		if(personLogin) {
			const userInfo = await this.controller.getPersonByLogin(personLogin);
			if(userInfo && userInfo[0]?.id && this.props.chatId) {
				const personId = [userInfo[0].id as number];
				this.controller.deletePersonToChat(personId, this.props.chatId);
			} else {
				console.error('person id not found');
				alert('person id not found');
			}
		}
	}

	getMessagesBefore() {
		this.wss.send(JSON.stringify({
			content: '0',
			type: 'get old'
		}));
	}

	async componentDidUpdate() {
		this.rwMessages = [];
		await this.initSocket();
		this.getMessagesBefore();
	}

	async initSocket(){
		const wss = await this.controller.createWs(this.props.chatId!, this.user.id, this.onMessageWebSocket.bind(this));
		if(wss instanceof WebSocket) {this.wss = wss;}
	}

	async onSubmitMessage(){
		const { messageForm } = document.forms as Form;
		getFormData(messageForm);
		const isValid = this.messageInput.getIsInputValid();
		if(isValid && this.props.chatId){
			this.initSocket();
			this.wss.send(JSON.stringify({
				content: this.messageInput.getInputValue(),
				type: 'message',
			}));
			this.messageInput.setInputValue('');
			this.props.localEventBus.emit('onNewMessage');
		} else {
			console.log('We dont have chatId', this.props, 'or isValid', isValid);
		}
	}

	private sortByDate(a: RwMessage, b:RwMessage) {
		return new Date(a.time).getTime() - new Date(b.time).getTime();
	}

	private onMessageWebSocket(event: MessageEvent) {
		const { data } = event;
		const parsedData = JSON.parse(data);
		if (isArray(parsedData)) {
			parsedData.forEach((el: RwMessage) => this.rwMessages.push(el));
		} else if (isObject(parsedData)) {			
			parsedData.type === 'message' && this.rwMessages.push(parsedData as RwMessage);
		} else {
			throw new Error('Not supported type of parsed WS response!');
		}
		const messages = this.rwMessages.sort(this.sortByDate).map((msg) => new Message({
			messageText: msg.content,
			messageTime: new Date(msg.time).toLocaleTimeString([], {
				year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
			}),
			isMessageAuthor: msg.user_id === this.user.id,
		}));
		this.messages = messages;
		this.forceRender();
	}



	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'messageInput',
			this.messageInput.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'submitMessageButton',
			this.submitMessageButton.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'searchPerson',
			this.searchPerson.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'removePerson',
			this.removePerson.renderAsHTMLString()
		);
		renderHelper.registerPartial(
			'messages',
			this.messages.map(message => message.renderAsHTMLString()).join('')
		);
		const templateHTML = renderHelper.generate(conversationTmpl);
		return renderHelper.replaceElements(templateHTML, [
			this.messageInput,
			this.submitMessageButton,
			this.searchPerson,
			this.removePerson,
			...this.messages,
		]);
	}
}

