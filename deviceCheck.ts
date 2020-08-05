export enum Devices {
    Mobile,
    Tablet,
    Web,
    Desktop,
}

export class DeviceCheck  {
    private static readonly smBreakpoint = 768;
    private static readonly mdBreakpoint = 1025;
    private static readonly lgBreakpoint = 1440;

    public getCurrentDevice = () => {
        if (this.isMobileDevice()) {
            return Devices.Mobile;
        }
        if (this.isTabletDevice()) {
            return Devices.Tablet;
        }
        if (this.isWebDevice()) {
            return Devices.Web;
        }
        if (this.isDesktop()) {
            return Devices.Desktop;
        }
        return undefined;
    }

    public isMobileDevice = () => {
        return (window.innerWidth < DeviceCheck.smBreakpoint);
    }

    public isTabletDevice = () => {
        return (window.innerWidth >= DeviceCheck.smBreakpoint && window.innerWidth < DeviceCheck.mdBreakpoint);
    }

    public isWebDevice = () => {
        return (window.innerWidth >= DeviceCheck.mdBreakpoint && window.innerWidth < DeviceCheck.lgBreakpoint);
    }

    public isDesktop = () => {
        return (window.innerWidth >= DeviceCheck.lgBreakpoint);
    }

    public isBrowser = () => {
        try {
            return typeof window !== 'undefined';
        }catch(e){
            return false;
        }
    }
}

export const deviceCheck = new DeviceCheck();
