import error from './error.tmpl';
import './error.less';
import Block from '../../commonClasses/Block';
import Button from '../../components/button';
import Router from '../../services/router';
import RenderHelper from '../../commonClasses/RenderHelper';

type ErrorProps = {
	code: number;
	description: string;
}

export default class Error extends Block {
	toChat: Button;
	router: Router;

	constructor(props: ErrorProps) {
		super('div', props, true);
		this.router = new Router();
	}

	componentDidMount() {
		this.toChat = new Button({
			buttonStyle: 'defaultButton',
			buttonText: 'Return to Chat',
			events: {
				click: this.onClickChat.bind(this),
			},
		});

	}

	onClickChat() {
		this.router.go('/messenger');
	}


	render() {
		const renderHelper = new RenderHelper();
		renderHelper.registerPartial(
			'linkToChats',
			this.toChat.renderAsHTMLString()
		);
		const templateHTML = renderHelper.generate(error, {
			code: this.props.code,
			description: this.props.description
		});
		return renderHelper.replaceElements(templateHTML, [
			this.toChat
		]);
	}
}

