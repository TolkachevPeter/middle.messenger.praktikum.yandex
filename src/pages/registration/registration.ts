import registration from "./registration.tmpl";
import "./registration.less";
import Button from "../../components/button";
import Block from "../../commonClasses/Block";
import { Form } from "../../types/types";
import Input from "../../components/input/input";
import {
    emailCheck,
    loginCheck,
    nameOrSurnameCheck,
    passwordCheck,
    phoneCheck,
} from "../../global/regex";
import Link from "../../components/link";
import { navigateTo } from "../../router";
import RenderHelper from "../../commonClasses/RenderHelper";

export default class Login extends Block {
    button: Button;
    loginInput: Input;
    passwordInput: Input;
    linkToRegistration: Link;
    emailInput: Input;
    nameInput: Input;
    surnameInput: Input;
    phoneInput: Input;
	passwordSecondInput: Input;
    constructor() {
        super("div");
    }

    componentDidMount() {
        this.button = new Button({
            buttonStyle: "defaultButton",
            buttonText: "Complete registration",
            events: {
                click: this.onClickRegistration.bind(this),
            },
        });
        this.loginInput = new Input({
            inputText: "Login",
            inputPlaceholder: "Login",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationLabelStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: loginCheck,
        });
        this.emailInput = new Input({
            inputText: "Email",
            inputPlaceholder: "Email",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationLabelStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: emailCheck,
        });
        this.nameInput = new Input({
            inputText: "Name",
            inputPlaceholder: "Name",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationLabelStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: nameOrSurnameCheck,
        });
        this.surnameInput = new Input({
            inputText: "Surname",
            inputPlaceholder: "Surname",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationLabelStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: nameOrSurnameCheck,
        });
        this.phoneInput = new Input({
            inputText: "Phone",
            inputPlaceholder: "Phone",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationLabelStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: phoneCheck,
        });
        this.passwordInput = new Input({
            inputText: "Password",
            inputPlaceholder: "Password",
            inputStyle: "loginInputStyle",
            inputType: "password",
            labelStyle: "loginLabelStyle",
            mediumMarginHorizontally: true,
            validation: passwordCheck,
        });
        this.passwordSecondInput = new Input({
            inputText: "Password",
            inputPlaceholder: "Password",
            inputStyle: "loginInputStyle",
            inputType: "password",
            labelStyle: "loginLabelStyle",
            mediumMarginHorizontally: true,
            validation: passwordCheck,
        });
        this.linkToRegistration = new Link({
            linkText: "Sign In",
            linkStyle: "link-signin",
            event: {
                click: this.onClickLinkToSignIn.bind(this),
            },
        });
    }

    onClickSignIn() {
        const { loginForm } = document.forms as Form;
        getFormData(loginForm);
        this.loginInput.validateInput();
    }

    onClickLinkToSignIn() {
        navigateTo("loginPage");
    }

    onClickRegistration() {
        const { registrationForm } = document.forms as Form;
        getFormData(registrationForm);
        this.getAllInputs().forEach((input) => {
            input.validateInput();
        });
        const isValidationPassed = this.getAllInputs()
            .map((inpField) => inpField.getIsInputValid())
            .every((isValidField) => isValidField);
        if (isValidationPassed) {
            navigateTo("chatsPage");
        }
    }

    getAllInputs() {
        return [
            this.loginInput,
            this.emailInput,
            this.nameInput,
            this.surnameInput,
            this.phoneInput,
            this.passwordInput,
            this.passwordSecondInput,
        ];
    }

    render() {
        const renderHelper = new RenderHelper();
        renderHelper.registerPartial(
            "completeRegistration",
            this.button.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "loginInput",
            this.loginInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "emailInput",
            this.emailInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "nameInput",
            this.nameInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "surnameInput",
            this.surnameInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "phoneInput",
            this.phoneInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "passwordInput",
            this.passwordInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "passwordSecondInput",
            this.passwordSecondInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "linkToRegistration",
            this.linkToRegistration.renderAsHTMLString()
        );
        const templateHTML = renderHelper.generate(registration);
        return renderHelper.replaceElements(templateHTML, [
            this.button,
            this.linkToRegistration, 
			...this.getAllInputs()
        ]);
    }
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