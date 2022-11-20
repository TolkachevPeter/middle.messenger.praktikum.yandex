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

type ConversationProps = {
	chatId?: number,
	localEventBus: EventBus,
	messages?: Message[]
  }

export default class Conversation extends Block {
	controller: ConversationController;
	user: UserInfo;
	props: ConversationProps;
	messageInput: Input;
	submitMessageButton: Button;
	messages: Message[];
	constructor(props: ConversationProps) {
		super('div', props, false, true);
	}

	async componentDidMount() {
		this.controller = new ConversationController();
		this.user = await this.controller.getUserInfo();
		this.messages = [];

		this.messageInput = new Input({
			inputPlaceholder: 'Message',
			inputType: 'text',
			inputStyle: 'form-conversation__inputfield_style_default',
			mediumMarginHorizontally: true,
			validation: noEmptyStringCheck,
			isLabelEnabled: false,
		});
		this.submitMessageButton = new Button({
			buttonStyle: 'button_style_round-arrow-right',
			events: {
				click: this.onSubmitMessage.bind(this),
			},
		});
	}

	async onSubmitMessage(){
		const { messageForm } = document.forms as Form;
		console.log('messageForm', messageForm);
		const dataForm = getFormData(messageForm);
		console.log(dataForm);
		const isValid = this.messageInput.getIsInputValid();
		console.log('isValid', isValid);
		// if(isValid){
			this.messageInput.setProps({inputValue: ''});
			this.props.localEventBus.emit('onNewMessage');
		// }


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

