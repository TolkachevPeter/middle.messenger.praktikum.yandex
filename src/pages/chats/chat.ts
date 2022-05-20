import Handlebars from 'handlebars';
import { chatList } from '../../components/chatList/index';
import chat from './chat.tmpl';
import './chat.less';

Handlebars.registerPartial('chatsList', chatList());

const template = Handlebars.compile(chat);

export default () => template();
