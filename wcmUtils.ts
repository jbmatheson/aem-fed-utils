export class WcmUtils  {
    private static readonly WCMMODE_DISABLED = 'DISABLED';
    private static readonly WCMMODE_EDIT = 'EDIT';

    public getWcmMode = () => {
        const wcmMode = document.querySelector("meta[property='global:wcmMode']");
        if (wcmMode) {
            return wcmMode.getAttribute("content");
        } else {
            return '';
        }
    }

    /**
     * Returns true if the user is in edit view, and false if in view as published
     * @returns {boolean}
     */
    public isWcmEditMode = () => {
        const isAuthorMode = this.getWcmMode() == WcmUtils.WCMMODE_EDIT;
        const isPreviewMode = this.getWcmMode() == WcmUtils.WCMMODE_DISABLED;

        return isAuthorMode && !isPreviewMode;
    }

    /**
     * Returns true if the code running is on an author instance
     * @returns {boolean}
     */
    public isAuthorInstance = () => {
        return this.getWcmMode() == WcmUtils.WCMMODE_EDIT;
    }
}

export const wcmUtils = new WcmUtils();
