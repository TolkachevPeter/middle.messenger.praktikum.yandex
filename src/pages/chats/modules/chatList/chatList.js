import Handlebars from 'handlebars';
import chatList from './chatList.tmpl';

import './chatList.tmpl';
import './chatList.less';

import { generateSearchField } from '../../../../components/search/index.js';

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
];

Handlebars.registerPartial('searchField', generateSearchField());

const template = Handlebars.compile(chatList);

export default () =>
	template({
		chatContacts: chatContacts,
	});
