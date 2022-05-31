import chatContact from './chatContact.tmpl';
import './chatContact.less';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';
import Handlebars from 'handlebars';


type Props = {
    firstName?: string;
    content?: string;
	time?: Date;
	events?: {[key: string]: any}
};
export default class ChatContact extends Block {
    constructor(props: Props) {
        super("div", props);
    }

    render() {
        const renderHelper = new RenderHelper();
        const template = Handlebars.compile(chatContact);
        const templateHTML = template({
            firstName: this.props.firstName,
            content: this.props.content,
            time: this.props.time,
        });
        return renderHelper.convertHtmlToDom(templateHTML);
    }
}
