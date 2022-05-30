import Handlebars from 'handlebars';
import chatList from './chatList.tmpl';
import Block from '../../commonClasses/Block';

import './chatList.less';

import { generateSearchField } from '../search/index';
import Link from '../link';
import { navTo } from '../../router';
import RenderHelper from '../../commonClasses/RenderHelper';

// Handlebars.registerPartial('searchField', generateSearchField());

// const template = Handlebars.compile(chatList);

export default class ChatList extends Block {
    localEventBus: any;
    isSelected: boolean;
    selected: number;
    search: string;
    profileLink: Link;
	chatContact: { name: string; lastMessage: string; lastMessageTime: string; }[];

    constructor(props) {
        super("div", props);
        this.localEventBus = this.props.localEventBus;
        this.isSelected = false;
        this.selected = 0;
    }

    componentDidMount() {
        this.search = generateSearchField();
        this.profileLink = new Link({
            linkText: "Profile",
            linkStyle: "chatlist__link_profile",
            events: {
                click: this.onClickProfile.bind(this),
            },
        });
		this.chatContact = [
	{
		name: 'Peter',
		lastMessage: 'Message',
		lastMessageTime: new Date().toLocaleTimeString(),
	},
	{
		name: 'Ivan',
		lastMessage: 'Верстка слегка скучна',
		lastMessageTime: '10:05',
	},
	{
		name: 'review',
		lastMessage: window.location.href,
		lastMessageTime: new Date().toLocaleTimeString(),
	},
];
    }

    onClickProfile() {
        navTo("profilePage");
    }

	    render() {
        const renderHelper = new RenderHelper();
        // renderHelper.registerPartial(
        //     "search",
        //     this.search.renderAsHTMLString()
        // );
        renderHelper.registerPartial(
            "profileLink",
            this.profileLink.renderAsHTMLString()
        );
        // renderHelper.registerPartial(
        //     "chatContact",
        //     this.chatContact.renderAsHTMLString()
        // );
        const templateHTML = renderHelper.generate(chatList);
        return renderHelper.replaceElements(templateHTML, [
            this.profileLink,
        ]);
    }
}

