import {fcbDocumentReady} from './documentReady';

export class Focus {

    constructor() {
        fcbDocumentReady.ready(this.preventFocusIndicatorOnClick);
    }

    private preventFocusIndicatorOnClick() {
        document.addEventListener('mousedown', (e: Event) => {
            const target = e.target;
            for (const property in target) {
                if (property === 'tagName') {
                    if (target[property] == 'INPUT' || target[property] == 'LABEL' || target[property] == 'TEXTAREA') {
                        return;
                    } else {
                        e.preventDefault();
                    };
                };
            };
        });
    }

}

export const focus = new Focus();
