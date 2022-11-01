import messages from './messages.tmpl';
import './messages.less';
import Button from '../button';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';
import { noEmptyStringCheck } from '../../global/regex';
import Input from '../input';
import { Form } from '../../types/types';
import getFormData from '../../utils/getFormData';


export default class Messages extends Block {
	rh: RenderHelper;
	submitMessageButton: Button;
	renderHelper: RenderHelper;
	messageInput: Input;
	constructor() {
		super('div');
	}

	componentDidMount() {
		this.messageInput = new Input({
			inputPlaceholder: 'Message',
			inputType: 'text',
			inputText: 'Message',
			inputStyle: 'form-message__inputfield_style_default',
			mediumMarginHorizontally: true,
			validation: noEmptyStringCheck,
			isLabelEnabled: false,
			isValid: true,
		});
		this.submitMessageButton = new Button({
			buttonStyle: 'button_style_round-arrow-right',
			events: {
				click: this.onClickSubmitMessage.bind(this),
			},
		});
	}

	onClickSubmitMessage() {
		const { messageForm } = document.forms as Form;
		getFormData(messageForm);
		this.messageInput.validateInput();
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
		const templateHTML = renderHelper.generate(messages);
		return renderHelper.replaceElements(templateHTML, [
			this.messageInput,
			this.submitMessageButton,
		]);
	}
}
