import Handlebars from 'handlebars';
import login from './login.tmpl';
import './login.less';
import Button from '../../components/button';
import { generateInpField } from '../home/modules/input/index';
import Block from '../../commonClasses/Block';

export default class Page extends Block {
	button: Button;
	constructor() {
		super("div");
	}

	componentDidMount() {
		this.button = new Button({
            buttonStyle: "button_style_default",
			buttonText: "Sign in",
			events: {
				click: this.onClickSignIn.bind(this)
			}
        });
	}

	render(): void {
		
	}


}
