import Handlebars from 'handlebars';
import input from './input.tmpl';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';

export class Input extends Block {
    isValid: boolean;
    valid: { regex: RegExp; validationMessage: string };
    constructor(props) {
        super("div", props);
        this.valid = this.props.validation;
        this.isValid = this.props.isValid ? true : false;
    }

    componentDidMount() {
        this.addEventToInput({
            blur: this.handleBlur.bind(this),
            focus: this.handleFocus.bind(this),
        });
    }

    getIsInputValid(): boolean {
        return this.isValid;
    }

    getInputValue() {
        return (
            this.getElement().querySelector(".inputField") as HTMLInputElement
        ).value;
    }

}