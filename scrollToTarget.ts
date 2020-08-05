import { polyfill } from 'smoothscroll-polyfill';

/**
 * Scrolls the page to a specific element
 * @param {string} id The id of the element to scroll to
 */
export const scrollToTarget = (id: string) => {
    const element = document.getElementById(id);
    if(element) {
        element.setAttribute("tabindex", "-1");
        element.focus();
        window.scroll(0, 0);
        polyfill();

        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
        let originalTop = distanceToTop(element);

        const header = document.getElementsByClassName("fcb-header")[0];
        if(header) {
            const scrollBack = 16 + (header as HTMLElement).offsetHeight;
            originalTop = originalTop - scrollBack;
        }
        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    }
};

/**
 * Scrolls a element into view. Will scroll inside the nearest scrolling parent.
 * @param {HTMLElement} element
 * @param {ScrollIntoViewOptions} options optional ScrollIntoViewOptions object.
 */
export const scrollIntoView = (element: HTMLElement, options?: ScrollIntoViewOptions) => {
    polyfill();
    options = !options ? {behavior: 'smooth'} : options;
    element.scrollIntoView(options);
};
