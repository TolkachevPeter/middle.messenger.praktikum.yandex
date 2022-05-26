import registration from "./registration.tmpl";
import "./login.less";
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
import { navTo } from "../../router";
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
    constructor() {
        super("div");
    }

    componentDidMount() {
        this.button = new Button({
            buttonStyle: "button_style_default",
            buttonText: "Complete registration",
            events: {
                click: this.onClickRegistration.bind(this),
            },
        });
        this.loginInput = new Input({
            inputText: "Login",
            inputPlaceholder: "Login",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationInputStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: loginCheck,
        });
        this.emailInput = new Input({
            inputText: "Email",
            inputPlaceholder: "Email",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationInputStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: emailCheck,
        });
        this.nameInput = new Input({
            inputText: "Name",
            inputPlaceholder: "Name",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationInputStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: nameOrSurnameCheck,
        });
        this.surnameInput = new Input({
            inputText: "Surname",
            inputPlaceholder: "Surname",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationInputStyle",
            readOnly: false,
            mediumMarginHorizontally: true,
            validation: nameOrSurnameCheck,
        });
        this.phoneInput = new Input({
            inputText: "Phone",
            inputPlaceholder: "Phone",
            inputStyle: "registrationInputStyle",
            labelStyle: "registrationInputStyle",
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
        navTo("loginPage");
    }

    render() {
        const renderHelper = new RenderHelper();
        renderHelper.registerPartial(
            "signInButton",
            this.button.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "loginInput",
            this.loginInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "passwordInput",
            this.passwordInput.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "linkToRegistration",
            this.linkToRegistration.renderAsHTMLString()
        );
        const templateHTML = renderHelper.generate(login);
        return renderHelper.replaceElements(templateHTML, [
            this.button,
            this.loginInput,
            this.passwordInput,
            this.linkToRegistration,
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
