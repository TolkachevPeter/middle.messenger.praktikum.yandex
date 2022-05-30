import Handlebars from 'handlebars';
import { chatList } from '../../components/chatList/index';
import chat from './chat.tmpl';
import './chat.less';
import "./chat.less";
import Button from "../../components/button";
import Block from "../../commonClasses/Block";
import Input from "../../components/input/input";
import Link from "../../components/link";
import { navTo } from "../../router";
import RenderHelper from "../../commonClasses/RenderHelper";
import ChatService from '../../services/chatService';
import EventBus from '../../commonClasses/EventBus';
import Messages from '../../components/messages';
import ChatList from '../../components/chatList/chatList';
import { Form } from '../../types/types';
import { getFormData } from '../registration/registration';

export default class Chat extends Block {
	chatContacts: any;
	localEventBus: any;
	renderAfterChatSelection: any;
	chatList: ChatList;
	messages: Messages;
	loginInput: Input;

    constructor() {
        super("div");
    }

    componentDidMount() {
    this.chatContacts = ChatService.getChats();
    // this.localEventBus = new EventBus();
    // this.localEventBus.on(
    //     "chatIsSelected",
    //     this.renderAfterChatSelection.bind(this)
    // );
    this.chatList = new ChatList({
        chatContacts: this.chatContacts,
        // localEventBus: this.localEventBus,
    });
    this.messages = new Messages();
    }


    render() {
        const renderHelper = new RenderHelper();
        renderHelper.registerPartial(
            "chatList",
            this.chatList.renderAsHTMLString()
        );
        renderHelper.registerPartial(
            "messages",
            this.messages.renderAsHTMLString()
        );
        const templateHTML = renderHelper.generate(chat);
        return renderHelper.replaceElements(templateHTML, [
            this.chatList,
            this.messages,
        ]);
    }
}
