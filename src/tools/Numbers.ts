export class Numbers extends HTMLElement {
    query: string;

    constructor() {
        super();
        this.attachShadow({mode : 'open' });
    }

    connectedCallback(): void {
        const query = this.parse(this.getAttribute('query'));
        Intl.NumberFormat
        this.shadowRoot!.innerHTML = `
            <div>
                <h1>Number</h1>
                <dl>
                    <dt>${query}</dt>
                    <dd>decimal</dd>

                    <dt>${query.toString(16)}</dt>
                    <dd>hexa</dd>

                    <dt>${query.toString(2)}</dt>
                    <dd>binary</dd>

                    <dt>${query.toString(8)}</dt>
                    <dd>octal</dd>
                </dl>
            </div>`;
    }

    private parse(input: string): number {
        for (const base of [10, 16, 2, 8]) {
            const r = parseInt(input, base);
            if (!Number.isNaN(r)) {
                return r;
            }
        }
        return parseFloat(input);
    }

    static get observedAttributes(): string[] {
        return ['query'];
    }

    public static accept(value: string): boolean {
        return /^[0-9a-fA-F,. ]+$/.test(value);
    }

    public static elmentName(): string {
        return 'mba-tools-numbers';
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
      if (name === 'query') {
        console.log('query', newValue);
      }
    }
}