export class AwesomeBar extends HTMLElement {
    query: string;

    constructor() {
        super();
        this.attachShadow({mode : 'open' });
    }

    connectedCallback(): void {
        this.shadowRoot!.innerHTML = `
        <style>
        *,
        *::before,
        *::after { 
          box-sizing: border-box;
        }
        
        .input-sizer {
          display: inline-grid;
          vertical-align: top;
          align-items: center;
          position: relative;
          border-radius: 10px;
          padding: .25em .5em;
          margin: 5px;
          background-color: var(--nord3);
          
          &.stacked {
            padding: .5em;
            align-items: stretch;
            
            &::after,
            input,
            textarea {
              grid-area: 2 / 1;
              color: var(--nord6);
            }
          }
          
          &::after,
          input,
          textarea {
            width: auto;
            min-width: 1em;
            grid-area: 1 / 2;
            font: inherit;
            padding: 0.25em;
            margin: 0;
            resize: none;
            background: none;
            appearance: none;
            border: none;
          }
          
          span {
            padding: 0.25em;
          }
          
          &::after {
            content: attr(data-value) ' ';
            visibility: hidden;
            white-space: pre-wrap;
          }
        }
        
        .input-sizer {
          > span {
            text-transform: uppercase;
            font-size: 0.8em;
            font-weight: bold;
          }
        }
        </style>
        <div class="input-sizer stacked">
        <label for="name">Quoi ?</label>
        <textarea oninput="this.parentNode.dataset.value = this.value" rows="1" id="name" name="name"></textarea>
        </div>`;

        const input = this.shadowRoot!.querySelector('textarea');

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
        input.focus();
    }

    get value() {
        let textbox = this.shadowRoot.querySelector("input");
        return textbox.value;
    }
}