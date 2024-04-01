export class AwesomeBar extends HTMLElement {
    query: string;

    constructor() {
        super();
        this.attachShadow({mode : 'open' });
    }

    connectedCallback(): void {
        this.shadowRoot!.innerHTML = `
        <label for="name">Quoi ?</label>
        <input type="text" id="name" name="name" size="40" />`;

        const input = this.shadowRoot!.querySelector('input');

        const debounce = (callback, wait: number) => {
            let timeoutId = null;
            return (...args: any) => {
              window.clearTimeout(timeoutId);
              timeoutId = window.setTimeout(() => callback.apply(null, args), wait);
            };
          };

        const handleMouseMove = debounce(() => {
            this.dispatchEvent(new CustomEvent('change', {detail: input.value}));
        }, 250);

        input.addEventListener('input', handleMouseMove);
    }

    get value() {
        let textbox = this.shadowRoot.querySelector("input");
        return textbox.value;
    }
}