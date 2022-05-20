import Handlebars from 'handlebars';

export default class RenderHelper {
	generate<T>(template: string, content?:T) {
		const templ = Handlebars.compile(template);
		if(content) {
			const templContent = Object.entries(content).reduce(
                (
                    res: Record<string, any>,
                    [key, value]: [key: string, value: any]
                ) => {
                    res[key] = value;
                    return res;
                },
                {}
            );
			return templ(templContent);
		}
		return templ({});
	}

	registerPartial(name: string, template: string){
		return Handlebars.registerPartial(name, template);
	}

	convertHtmlToDom(html:string): DocumentFragment{
		const template = document.createElement('template');
		template.innerHTML = html.trim();
		return template.content;
	}

	convertDomToHtml(dom:Document): string{
		const div = document.createElement('div');
		div.appendChild(dom.cloneNode(true));
		return div.innerHTML;
	}

}