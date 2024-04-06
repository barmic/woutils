import { AwesomeBar } from './AwesomeBar';
import { BoxResponse } from './BoxRespons';
import { Responses } from './Response';
import { Numbers } from './tools/Numbers';

customElements.define('awesome-bar', AwesomeBar );
customElements.define('mba-responses', Responses );
customElements.define('mba-box', BoxResponse );
customElements.define(Numbers.elmentName(), Numbers );

const responses = document.querySelector('mba-responses');

document.querySelector('awesome-bar')
    .addEventListener('change', (ev: CustomEvent) => {
        responses.setAttribute('query', ev.detail);
    })