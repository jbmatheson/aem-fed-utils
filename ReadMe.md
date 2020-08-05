# AEM FED Utilities

Projects that use the FED-Archetype (UI.Frontend) and go with Typescript can add this package to their project to get some very common global helper modules.

### The modules in this include:
* CollapseContent
  * addClickCollapseListener
  * toggleClick
  * openContent
  * closeContent
  * setCustomCallback
  * setCustomOnClickClass
  * setInstanceVariables
  * checkIfElementHasCollapseClasses
  * toggleCollapseClass
  * setInitialCollapseState
  * setAriaState
* CustomEventPolyfill
  * CustomEvent
  * polyfill
* Devices (enum)
  * Mobile
  * Tablet
  * Web
  * Desktop
* DeviceCheck
  * private static readonly smBreakpoint;
  * private static readonly mdBreakpoint;
  * private static readonly lgBreakpoint;
  * getCurrentDevice
  * isMobileDevice
  * isTabletDevice
  * isWebDevice
  * isDesktop
  * isBrowser
* DocumentReady
  * ready
* Focus
  * preventFocusIndicatorOnClick
* QueryParams
  * getParam
* RequestUtils
  * makeJSONRequest
* ScrollToTarget
  * scrollToTarget
  * scrollIntoView
* TrapFocus
  * trapFocus
* WCMUtils
  * getWcmMode
  * isWcmEditMode
  * isAuthorInstance
