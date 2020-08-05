const CANDIDATES = `
  a, button, input, select, textarea, svg, area, details, summary,
  iframe, object, embed,
  [tabindex], [contenteditable]
`;

/**
 * Trap focus in a specific DOM node.
 */
export const trapFocus = (focusNode, rootNode = document) => {
    const nodes = [...rootNode.querySelectorAll(CANDIDATES) as any]
        .filter(node => !focusNode.contains(node) && node.getAttribute('tabindex') !== '-1');
    const trap = () => nodes.forEach(node => node.setAttribute('tabindex', '-1'));
    const release = () => nodes.forEach(node => node.removeAttribute('tabindex'));

    trap();

    return {
        nodes,
        release,
        retrap: trap,
    };
};

