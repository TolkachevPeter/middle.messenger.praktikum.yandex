import notRenderedTemplateRight from './messages.right.tmpl';
import notRenderedTemplateLeft from './messages.left.tmpl';
import './messages.less';
import Button from '../button';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';
import Input from '../input';
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
	templateToRender: string;
	constructor(props: MessageProps) {
		super('div', props);
	}

	componentDidMount() {
		this.templateToRender = this.props.isMessageAuthor
			? notRenderedTemplateRight : notRenderedTemplateLeft;
	}


	render() {
		const renderHelper = new RenderHelper();
		const template = Handlebars.compile(this.templateToRender);
		const templateHTML = template({
			messageText: this.props.messageText,
			messageTime: this.props.messageTime,
		});
		return renderHelper.convertHtmlToDom(templateHTML);
	}
}
