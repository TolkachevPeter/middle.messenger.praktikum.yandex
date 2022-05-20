import Handlebars from 'handlebars';
import chatList from './chatList.tmpl';
import Block from '../../commonClasses/Block';

import './chatList.less';

import { generateSearchField } from '../search/index';

const chatContacts = [
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

Handlebars.registerPartial('searchField', generateSearchField());

const template = Handlebars.compile(chatList);

export default () =>
	template({
		chatContacts: chatContacts,
	});
