import Block from '../commonClasses/Block';

class Route {
	private _pathname: string;
	private _blockClass: Block;
	private _block: null | Block;
	private _props: { rootQuery?: string | undefined; };

	constructor(pathname: string, view: Block, props: { rootQuery?: string }) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this._pathname);
	}

	render() {
		if (!this._block) {
			this._block = this._blockClass;
			render(this._props.rootQuery!, this._block);
			return;
		}

		this._block.show();
	}
}

export default class Router {
	// eslint-disable-next-line no-use-before-define
	private static __instance: Router;
	routes: Route[];
	history: History;
	private _currentRoute: null | Route;
	private _rootQuery?: string;

	constructor(rootQuery?: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block: Block): this {
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = (event: Event) => {
			const { currentTarget } = event;
			currentTarget && this._onRoute((currentTarget as Window).location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		if(route){
			this._currentRoute = route;
			route.render();
		}

	}

	go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}
}


function isEqual(lhs: string, rhs: string): boolean {
	return lhs === rhs;
}
  
function render(query: string, block: Block): Element | null {
	const root = document.querySelector(query);
	root && root!.appendChild(block.getElement());
	return root;
}