import Handlebars from 'handlebars';
import login from './login.tmpl';
import './login.less';
import Button from '../../components/button';
import { generateInpField } from '../home/modules/input/index';
import Block from '../../commonClasses/Block';
import { Form } from '../../types/types';

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
                click: this.onClickSignIn.bind(this),
            },
        });
    }

    onClickSignIn(){
		const form = document.forms.loginForm as Form;
		getFormData(form);

	}

    render(): void {}
}

export function getFormData(form: HTMLFormElement) {
    const formData: FormData = new FormData(form);
    const consoleData = [...formData.entries()].reduce(
        (prev: Record<string, any>, [k, v]) => {
            prev[k] = v;
            return prev;
        },
        {}
    );
    console.log(consoleData);
}
