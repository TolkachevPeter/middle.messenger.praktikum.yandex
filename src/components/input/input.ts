import Handlebars from "handlebars";
import input from "./input.tmpl";
import './input.less';
import Block from "../../commonClasses/Block";
import RenderHelper from "../../commonClasses/RenderHelper";

type Props = {
    inputText?: string;
    inputPlaceholder?: string;
    inputType?: string;
    inputValue?: string;
    inputStyle?: string;
    labelStyle?: string;
    readOnly?: boolean;
    mediumMarginHorizontally?: boolean;
    vbox?: boolean;
    style_justifyContentSpaceBetween?: boolean;
    isValid?: boolean;
    isLabelEnabled?: boolean;
    validation?: {
        regex: RegExp;
        validationMessage: string;
    };
};

export default class Input extends Block {
    isValid: boolean;
    valid: { regex: RegExp; validationMessage: string };
    constructor(props: Props) {
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

    addEventToInput(events: { [key: string]: any }) {
        Object.keys(events).forEach((event) =>
            this.getElement().addEventListener(event, events[event], true)
        );
    }

    getIsInputValid(): boolean {
        return this.isValid;
    }

    isInputValid(inputValue: string): boolean {
        return this.valid.regex.test(inputValue);
    }

    handleFocus() {
        this.getElement()
            .querySelector(".input")!
            .classList.remove("input_style_invalid");
    }

    handleBlur() {
        const inputValue = this.getInputValue();
        if (!this.isInputValid(inputValue)) {
            this.isValid = false;
            this.setProps({
                isValid: false,
                inputValue,
            });
            this.getElement()
                .querySelector(".input")!
                .classList.add("input_style_invalid");
            (
                this.getElement().querySelector(
                    ".input__error-msg"
                )! as HTMLElement
            ).innerText = this.valid.validationMessage;
        } else {
            this.isValid = true;
            this.setProps({
                isValid: true,
                inputValue,
            });
            this.getElement()
                .querySelector(".input")!
                .classList.remove("input_style_invalid");
        }
    }

    getInputValue() {
        return (this.getElement().querySelector(".input") as HTMLInputElement)
            .value;
    }

	validateInput(){
		this.getElement().querySelector(".input")?.dispatchEvent(new Event('blur'))
	}

    render() {
        const renderHelper = new RenderHelper();
        const template = Handlebars.compile(input);
        const templateHTML = template({
            inputText: this.props.inputText || "",
            inputPlaceholder: this.props.inputPlaceholder || "",
            inputType: this.props.inputType || "text",
            inputValue: this.props.inputValue || "",
            inputStyle: this.props.inputStyle || "",
            labelStyle: this.props.labelStyle || "",
            readOnly: this.props.readOnly || false,
            mediumMarginHorizontally:
                this.props.mediumMarginHorizontally || false,
            vbox: this.props.vbox || false,
            style_justifyContentSpaceBetween:
                this.props.style_justifyContentSpaceBetween || false,
            isValid: this.props.isValid || false,
            validationMessage: this.props.validationMessage || "",
            isLabelEnabled: this.props.isLabelEnabled || true,
        });
        return renderHelper.convertHtmlToDom(templateHTML);
    }
}
