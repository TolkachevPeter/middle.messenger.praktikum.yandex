import chatContact from './chatContact.tmpl';
import './chatContact.less';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';
import Handlebars from 'handlebars';
import { baseUrl } from '../../config/config';


type Props = {
    firstName?: string;
    content?: string;
	time?: Date;
	index?: number;
	isSelected: boolean;
	events?: {[key: string]: any}
};
export default class ChatContact extends Block {
	constructor(props: Props) {
		super('div', props);
	}

	render() {
		const renderHelper = new RenderHelper();
		const template = Handlebars.compile(chatContact);
		const templateHTML = template({
			firstName: this.props.title ? this.props.title : '',
			content: this.props.last_message ? this.props.last_message.content : '',
			avatarUrlChatPhoto: this.props.avatar ? baseUrl + '/resources/' + this.props.avatar : undefined,
			time: this.props.last_message ? 
				new Date(this.props.last_message.time).toLocaleTimeString([], {
					year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
				})
				: '',
			isSelected: this.props.isSelected,
		});
		return renderHelper.convertHtmlToDom(templateHTML);
	}
}
