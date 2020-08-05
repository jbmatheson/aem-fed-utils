export const breakpoints = {
    mobileMax: 767,
    tabletMax: 991,
    smallDesktopMax: 1199,
    desktopMax: 1800,
};

export const deviceCheck = {
    isMobileDevice: function isMobileDevice() {
        if (window.innerWidth <= breakpoints.mobileMax) {
            return true;
        }
        return false;
    },
    isTabletDevice: function isTabletDevice() {
        if (window.innerWidth > breakpoints.mobileMax && window.innerWidth <= breakpoints.tabletMax) {
            return true;
        }
        return false;
    },
    isSmallDesktop: function isSmallDesktop() {
        if (window.innerWidth > breakpoints.tabletMax && window.innerWidth <= breakpoints.smallDesktopMax) {
            return true;
        }
        return false;
    },
    isDesktop: function isDesktop() {
        if (window.innerWidth > breakpoints.smallDesktopMax && window.innerWidth <= breakpoints.desktopMax) {
            return true;
        }
        return false;
    },
    isLargeDesktop: function isLargeDesktop() {
        if(window.innerWidth > breakpoints.desktopMax) {
            return true;
        }
        return false;
    },
    isBrowser: function isBrowser() {
        try {
            return typeof window !== 'undefined';
        }catch(e){
            return false;
        }
    }
};
