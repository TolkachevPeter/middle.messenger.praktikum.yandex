import EventBus from "./EventBus";
export default class Block {
    private _element: HTMLElement;
    private _meta: { props: any; tagName: "div" | "button" };
    props: any;
    eventBus: () => EventBus;
    static eventBus: () => EventBus;
    private _id: string;
    isFullPageHeight: boolean;
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };

    constructor(
        tagName: "div" | "button" = "div",
        props = {},
        isFullPageHeight = false
    ) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };
        this._id = Math.random().toString(16).slice(2);
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        this.isFullPageHeight = isFullPageHeight;
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        element.setAttribute("data-id", this._id);
        if (this.isFullPageHeight) {
            element.style.height = "100%";
        }
        return element;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() {}

    private _componentDidUpdate() {
        this.componentDidUpdate();
        this._render();
    }

    getElement() {
        return this._element;
    }

    componentDidUpdate() {}

    getId() {
        return this._id;
    }

    private _addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    private _render() {
        const block = this.render();
        this._element.innerHTML = "";
        this._element.appendChild(block);
        this._addEvents();
    }

    renderAsHTMLString() {
        return this._element.outerHTML;
    }

    render(): Node {
        return document.createElement("div");
    }

    show() {
        this.getElement().style.display = "block";
    }

    hide() {
        this.getElement().style.display = "none";
    }

    private _makePropsProxy(props: any) {
        function errorWhenPrivateProp(prop: string | number | symbol) {
            if (typeof prop === "string" && prop.indexOf("_") === 0) {
                throw new Error("Нет прав");
            }
        }

        return new Proxy(props, {
            get: (target, prop) => {
                errorWhenPrivateProp(prop);
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target, prop, value) => {
                errorWhenPrivateProp(prop);
                target[prop] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty: () => {
                throw new Error("Нет прав");
            },
        });
    }
}
