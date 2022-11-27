import notRenderedTemplateRight from './messages.right.tmpl';
import notRenderedTemplateLeft from './messages.left.tmpl';
import './messages.less';
import Button from '../button';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';
import { noEmptyStringCheck } from '../../global/regex';
import Input from '../input';
import { Form } from '../../types/types';
import getFormData from '../../utils/getFormData';
import Handlebars from 'handlebars';



type MessageProps = {
	messageText: string,
	messageTime: string,
	isMessageAuthor: boolean,
	events?: { click: ()=> void }
}
export default class Message extends Block {
	rh: RenderHelper;
	submitMessageButton: Button;
	renderHelper: RenderHelper;
	messageInput: Input;
	templateToRender: string;;
	constructor(props: MessageProps) {
		super('div', props);
	}

	componentDidMount() {
		this.templateToRender = this.props.isMessageAuthor
		  ? notRenderedTemplateRight : notRenderedTemplateLeft;
	}
	

	// onClickSubmitMessage() {
	// 	const { messageForm } = document.forms as Form;
	// 	getFormData(messageForm);
	// 	this.messageInput.validateInput();
	// }

	render() {
		const renderHelper = new RenderHelper();
		const template = Handlebars.compile(this.templateToRender);
		const templateHTML = template({
		  messageText: this.props.messageText,
		  messageTime: this.props.messageTime,
		});
		return renderHelper.convertHtmlToDom(templateHTML);
		// renderHelper.registerPartial(
		// 	'messageInput',
		// 	this.messageInput.renderAsHTMLString()
		// );
		// renderHelper.registerPartial(
		// 	'submitMessageButton',
		// 	this.submitMessageButton.renderAsHTMLString()
		// );
		// const templateHTML = renderHelper.generate(this.templateToRender);
		// return renderHelper.replaceElements(templateHTML, [
		// 	this.messageInput,
		// 	this.submitMessageButton,
		// ]);
	}
}
