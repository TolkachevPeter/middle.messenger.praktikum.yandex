import Handlebars from 'handlebars';
import input from './input.tmpl';
import Block from '../../commonClasses/Block';
import RenderHelper from '../../commonClasses/RenderHelper';

export class Input extends Block {
	constructor(props){
		super('div', props);
		this.valid = this.props.validation;
		this.isValid = this.props.isValid ? true : false;
	}

	componentDidMount(){
		
	}
}