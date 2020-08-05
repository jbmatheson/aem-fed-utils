export class CollapseContent {
    private static readonly HIDDEN_CLASS = 'visually-hidden';
    private static readonly ARIA_EXPANDED = 'aria-expanded';
    private clickableElement: HTMLElement;
    private elementToHide: HTMLElement;
    private openClass = '';
    private collapsedClass = '';
    private customOnClickClass: string;
    private callback: (element: HTMLElement, isOpen: boolean, event?: Event) => void;
    private hasCollapseClasses: boolean;

    public addClickCollapseListener = (clickableElement: HTMLElement, elementToHide: HTMLElement,
        openClass?: string, collapsedClass?: string) => {
        this.setInstanceVariables(clickableElement, elementToHide, openClass, collapsedClass);
        this.setInitialCollapseState();
        this.setAriaState();

        clickableElement.addEventListener('click', this.toggleClick);
    }

    public toggleClick = (event?: Event) => {
        const classToAddOrRemove = this.customOnClickClass ? this.customOnClickClass : CollapseContent.HIDDEN_CLASS;
        const isCollapsed: boolean = this.elementToHide.classList.contains(classToAddOrRemove);

        if (isCollapsed) {
            this.elementToHide.classList.remove(classToAddOrRemove);
        } else {
            this.elementToHide.classList.add(classToAddOrRemove);
        }

        this.toggleCollapseClass();
        if(this.callback) {
            this.callback(this.clickableElement, isCollapsed, event);
        }
    }

    public openContent = () => {
        const isCollapsed: boolean = this.elementToHide.classList.contains(CollapseContent.HIDDEN_CLASS);

        if(isCollapsed) {
            this.toggleClick();
        }
    }

    public closeContent = () => {
        const isCollapsed: boolean = this.elementToHide.classList.contains(CollapseContent.HIDDEN_CLASS);

        if(!isCollapsed) {
            this.toggleClick();
        }
    }

    public setCustomCallback = (callback: (element: HTMLElement, isOpen: boolean) => void) => {
        this.callback = callback;
    }

    public setCustomOnClickClass = (className: string) => {
        this.customOnClickClass = className;
    }

    private setInstanceVariables = (clickableElement: HTMLElement, elementToHide: HTMLElement,
        openClass?: string, collapsedClass?: string) => {
        this.clickableElement = clickableElement;
        this.elementToHide = elementToHide;
        this.openClass = openClass;
        this.collapsedClass = collapsedClass;
        this.checkIfElementHasCollapseClasses();
    }

    private checkIfElementHasCollapseClasses = () => {
        const elementHasOpenClass: boolean = this.openClass &&
            this.clickableElement.classList.contains(this.openClass);

        const elementHasCollapsedClass: boolean = this.collapsedClass &&
            this.clickableElement.classList.contains(this.collapsedClass);

        if (elementHasOpenClass || elementHasCollapsedClass) {
            this.hasCollapseClasses = true;
        } else {
            this.hasCollapseClasses = false;
        }
    }

    private toggleCollapseClass = () => {
        if (!this.hasCollapseClasses) {
            return;
        }

        const wasOpen: boolean = this.clickableElement.classList.contains(this.openClass);
        if (wasOpen) {
            this.clickableElement.classList.remove(this.openClass);
            this.clickableElement.classList.add(this.collapsedClass);
            this.clickableElement.setAttribute(CollapseContent.ARIA_EXPANDED, 'false');
        } else {
            this.clickableElement.classList.remove(this.collapsedClass);
            this.clickableElement.classList.add(this.openClass);
            this.clickableElement.setAttribute(CollapseContent.ARIA_EXPANDED, 'true');
        }
    }

    private setInitialCollapseState = () => {
        if (!this.hasCollapseClasses) {
            return;
        }

        const isCollapsed: boolean = this.clickableElement.classList.contains(this.collapsedClass);
        const classToAdd = this.customOnClickClass ? this.customOnClickClass : CollapseContent.HIDDEN_CLASS;

        if (isCollapsed) {
            this.elementToHide.classList.add(classToAdd);
        }
    }

    private setAriaState() {
        const isCollapsed: boolean = this.clickableElement.classList.contains(this.collapsedClass);

        if (isCollapsed) {
            this.clickableElement.setAttribute(CollapseContent.ARIA_EXPANDED, 'false');
        } else {
            this.clickableElement.setAttribute(CollapseContent.ARIA_EXPANDED, 'true');
        }
    }
}

export const collapseContent = new CollapseContent();
