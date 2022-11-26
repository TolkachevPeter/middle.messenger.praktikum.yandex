import conversationTmpl from './conversation.tmpl';
import './conversation.less';
import Button from '../../components/button';
import Block from '../../commonClasses/Block';
import { Form, UserInfo } from '../../types/types';
import Input from '../../components/input/input';
import Link from '../../components/link';
import Text from '../../components/text';
// import { navigateTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';
import Router from '../../services/router';
import getFormData from '../../utils/getFormData';
import ConversationController from './conversation.controller';
import { emailCheck, noEmptyStringCheck } from '../../global/regex';
import Message from '../messages';
import EventBus from '../../commonClasses/EventBus';
import { isArray, isObject } from '../../services/request';

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
		});
		this.submitMessageButton = new Button({
			buttonStyle: 'button_style_round-arrow-right',
			events: {
				submit: this.onSubmitMessage.bind(this),
				click: this.onSubmitMessage.bind(this),
			},
		});
	}

	getMessagesBefore() {
		this.wss.send(JSON.stringify({
			content: '0',
			type: 'get old'
		}))
	}

	async componentDidUpdate() {
		this.rwMessages = [];
		await this.initSocket();
		this.getMessagesBefore()
	}

	async initSocket(){
		const wss = await this.controller.createWs(this.props.chatId!, this.user.id, this.onMessageWebSocket.bind(this));
		if(wss instanceof WebSocket) this.wss = wss;
	}

	async onSubmitMessage(){
		const { messageForm } = document.forms as Form;
		console.log('messageForm', messageForm);
		const dataForm = getFormData(messageForm);
		console.log(dataForm);
		const isValid = this.messageInput.getIsInputValid();
		console.log('isValid', isValid);
		console.log('this.props.chatId', this.props.chatId);
		if(isValid && this.props.chatId){
			this.initSocket();
			this.messageInput.setProps({inputValue: ''});
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
		console.log('messages!!!!! webSocket', parsedData)
		if (isArray(parsedData)) {
		  parsedData.forEach((el: RwMessage) => this.rwMessages.push(el));
		} else if (isObject(parsedData)) {
		  this.rwMessages.push(parsedData as RwMessage);
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
		console.log('messages', messages)
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
			'messages',
			this.messages.map(message => message.renderAsHTMLString()).join('')
		);
		const templateHTML = renderHelper.generate(conversationTmpl);
		console.log('props', this.user);
		return renderHelper.replaceElements(templateHTML, [
			this.messageInput,
			this.submitMessageButton,
			...this.messages,
		]);
	}
}

