export class Dom {

    static of(el) {
        return new Dom(el);
    }

    static for(selector) {
        return new Dom(document.querySelector(selector));
    }

    static from(tag) {
        return new Dom(document.createElement(tag));
    }

    constructor(el) {
        this._element = el;
    }

    get element() {
        return this._element;
    }

    map(f) {
        return Dom.of(f(this._element));
    }

    addClasses(...classes) {
        return this.map(el => {
            for (let cl of classes) {
                if (typeof cl === 'string') {
                    cl.split(' ').forEach(clazz => el.classList.add(clazz));
                }
            }
            return el;
        });
    }

    removeClasses(...classes) {
        return this.map(el => {
            for (let cl of classes) {
                if (typeof cl === 'string') {
                    cl.split(' ').forEach(clazz => el.classList.remove(clazz));
                }
            }
            return el;
        })
    }

    setAttribute(name, value) {
        return this.map(el => {
            el.setAttribute(name, value);
            return el;
        });
    }

    removeAttributes(...attrs) {
        return this.map(el => {
            if (attrs.length) {
                for (let attr of attrs) {
                    el.removeAttribute(attr);
                }
            }
            return el;
        });
    }

    setStyle(prop, value, unit) {
        return this.map(el => {
            el.style.setProperty(prop, `${value}${unit}`);
            return el;
        })
    }

    forEach(fn) {
        return this.map(el => {
            [...el.children].forEach(fn);
            return el;
        });
    }

    setText(string) {
        return this.map(el => {
            if (string) {
                el.appendChild(document.createTextNode(string));
            }
            return el;
        });
    }

    pinTo(parent) {
        return this.map(el => {
           if (parent instanceof Dom) {
               parent.element.appendChild(el);
           } else {
               parent.appendChild(el);
           }
           return el;
        });
    }

    append(child) {
        return this.map(el => {
            if (child instanceof Dom) {
                el.appendChild(child.element)
            } else {
                el.appendChild(child);
            }
            return el;
        });
    }

    addEventListener(event, handler, options) {
        return this.map(el => {
            el.addEventListener(event, handler, options);
            return el;
        })
    }

    removeEventListener(event, handler, options) {
        return this.map(el => {
            el.removeEventListener(event, handler, options);
            return el;
        })
    }
}