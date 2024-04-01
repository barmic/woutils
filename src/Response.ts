import { Numbers } from './tools/Numbers';

export class Responses extends HTMLElement {
    query: string;

    constructor() {
        super();
        this.attachShadow({mode : 'open' });
    }

    connectedCallback(): void {
        this.shadowRoot!.innerHTML = `<div id="responses"></div>`;
    }

    static get observedAttributes() {
        return ['query'];
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
      if (name === 'query') {
        const responses = this.shadowRoot!.getElementById('responses');
        while (responses.firstChild) {
            responses.removeChild(responses.lastChild);
        }
        if (Numbers.accept(newValue)) {
            const tool = document.createElement(Numbers.elmentName());
            tool.setAttribute('query', newValue);
            responses.appendChild(tool);
        }

        let i = 0;
        while(i++ < newValue.length) {
            const p = document.createElement('p');
            p.textContent = newValue + i;
            responses.appendChild(p);
        }
      }
    }
}