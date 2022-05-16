import searchField from './search.tmpl';
import Handlebars from 'handlebars';
import './search.less';

const template = Handlebars.compile(searchField);

export default () => template();
