/**
 * Helper class to polyfill CustomEvent in order to support IE11
 */
export class CustomEventPolyfill {

    /**
     * The polyfill method that would get called for IE11
     * @param {string} event
     * @param {CustomEventInit} params
     * @returns {CustomEvent<any>}
     * @constructor
     */
    public static CustomEvent(event: string, params?: CustomEventInit) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        const evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    /**
     * Polyfills CustomEvent. Call this method to ensure window.CustomEvent is present for use and polyfills it with
     * the CustomEvent function on this class if needed
     * @returns {boolean}
     */
    public static polyfill = () => {
        if ( typeof window.CustomEvent === "function" ) {
            return;
        }

        (window as any).CustomEvent = CustomEventPolyfill.CustomEvent;
    }
}
