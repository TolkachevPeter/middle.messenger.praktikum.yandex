import button from './button.tmpl';
import Handlebars from 'handlebars';
import './button.less';
import Block from "../../commonClasses/Block";
import RenderHelper from "../../commonClasses/RenderHelper";

type ButtonProps = {
    buttonStyle: string;
    buttonText?: string;
};

export default class Button extends Block {
    renderHelper: RenderHelper;
    constructor(props: ButtonProps) {
        super("div", props);
    }

    render() {
        const renderHelper = new RenderHelper();
        const template = Handlebars.compile(button);
        const templateHTML = template({
            buttonStyle: this.props.buttonStyle,
            buttonText: this.props.buttonText || null,
        });
        return renderHelper.convertHtmlToDom(templateHTML);
    }
}