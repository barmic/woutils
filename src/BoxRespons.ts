const template = document.createElement('template');
template.innerHTML = `
<style>
div {
  background-color: var(--nord3);
  height: 400px;
  width: 344px;
  border: 1px;
  border-radius: 15px;
  padding: 1ex;
}
</style>
<div><slot></slot></div>`;

export class BoxResponse extends HTMLElement {
    query: string;

    constructor() {
        super();
        this.attachShadow({mode : 'open' });
    }

    connectedCallback(): void {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}