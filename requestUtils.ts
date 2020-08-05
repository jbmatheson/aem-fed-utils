import 'isomorphic-fetch';
import 'es6-promise';

/**
 * Helper class to store our utility functions for making ajax requests
 */
export class RequestUtils {
    private static readonly DOMAINS = {
        'WEB': 'web',
        'NETSOL': 'networksolutions',
        'REGISTER': 'register'
    };
    private static readonly DEFAULT_TRANSACTION_TYPE = "acquisition";
    private static readonly LIVE_PRICING = true;

    // NOTE: Flip this to test locally. TRUE for localhost testing only; otherwise FALSE.
    private static readonly IS_DEBUG = false;
    private static readonly DEBUG_DOMAIN = RequestUtils.DOMAINS.NETSOL;
    // ==================================================================================

    private static readonly API_ENDPOINT = '/sfcore.do';
    private static readonly URL_PREFIX = 'https://www.';
    private static readonly URL_SUFFIX = '.com';

    /**
     * Utility method that automatically parses JSON back from a request made
     * Automatically catches errors during the request.
     * @param {string} url
     * @param {RequestOptions} options
     * @returns {Promise<any | void>}
     */
    public static makeJSONRequest = (url: string, options: any = {}) => {
        return fetch(url, options)
            .then((response: Response) => {
                if(response.ok) {
                    return (response.json()
                        .then(data => {
                            return data;
                        }));
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    });
                }
            })
            .catch((error: Error) => {
                console.error(`An error occurred while fetching data for: ${url} ${error}`);
            });
    }

    /**
     * GET JSESSIONID value from browser cookies
     * @returns {String}
     */
    public static getSessionId = (): string => {
        const cookieValue = `; ${document.cookie}`;
        const cookieParts = cookieValue.split(`; JSESSIONID=`);
        if (cookieParts.length === 2) {
            return cookieParts.pop().split(';').shift();
        } else {
            return '';
        }
    }

    /**
     * Method checks against DEBUG constant for local
     * testing else returns the default endpoint.
     * @returns {String}
     */
    private static getEndPoint = (): string => {
        if(RequestUtils.IS_DEBUG) {
            return `${RequestUtils.URL_PREFIX + RequestUtils.DEBUG_DOMAIN + RequestUtils.URL_SUFFIX + RequestUtils.API_ENDPOINT}`
        }
        return RequestUtils.API_ENDPOINT;
    }

    /**
     * API to fetch the current shopping cart count
     */
    public static getCartCount = (callback) => {
        const endpoint = RequestUtils.getEndPoint();

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200 && xhr.response) {
                if (xhr.response.response) {
                    callback(xhr.response.response);
                }
            }
        }

        xhr.send(JSON.stringify({
            "request":{
                "requestInfo":{
                    "service": "CartAPI",
                    "method": "getCartCount",
                    "clientId": "AEM",
                    "apiAccessKey": "o7qsuyqmznkscppcdro678vidbr"
                }
            }
        }))
    }

    /**
     * API to fetch and retrieve Customer Name and to confirm whether user is logged in.
     */
    public static isUserLoggedIn = (callback) => {
        const endpoint = RequestUtils.getEndPoint();

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200 && xhr.response && xhr.response.response) {
                callback(xhr.response.response);
            } else {
                callback(null); //callback made for analytics failure condition
            }
        }

        xhr.send(JSON.stringify({
            "request":{
            "requestInfo":{
                "service":"UserAPI",
                "method":"isUserLoggedIn",
                "clientId":"AEM",
                "apiAccessKey":"o7qsuyqmznkscppcdro678vidbr"
            },
            "tenant":"WEB_PARENT_CHANNEL"
            }
        }))
    }

    /**
     * API call to fetch the CTAUrl for a given Product
     * @param productOptionsForCTA
     * @param cardNumber
     * @param callback
     */
    public static getCTAUrlForProduct = (productOptionsForCTA, cardNumber, callback) => {
        const endpoint = RequestUtils.getEndPoint();

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                if (xhr.response) {
                    callback(xhr.response.response, cardNumber);
                }
            }
        }

        xhr.send(JSON.stringify({
            "request": {
                "requestInfo": {
                    "service": "ProductAPI",
                    "method": "getCTAUrlForProduct",
                    "clientId": "AEM",
                    "apiAccessKey": "o7qsuyqmznkscppcdro678vidbr"
                },
                "tenant": productOptionsForCTA.tenant,
                "flowId": productOptionsForCTA.flowId,
                "screenId": productOptionsForCTA.screenId,
                "productCode": productOptionsForCTA.productCode,
                "term": productOptionsForCTA.term,
                "siteId": productOptionsForCTA.siteId,
                "coupon": productOptionsForCTA.coupon,
                "chargeType": RequestUtils.DEFAULT_TRANSACTION_TYPE,
                "productLevelChannelId": productOptionsForCTA.productLevelChannelId,
                "redirectBehavior": productOptionsForCTA.redirectBehavior
            }
        }));
    }

    /**
     * API to fetch and retrieve the Product Price either from the manual authored
     * Solution Card or the Content Fragment associate with it.
     */
    public static getPriceForProduct = (productOptions, cardNumber, callback) => {
        const endpoint = RequestUtils.getEndPoint();

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                if (xhr.response) {
                    callback(xhr.response.response.data, cardNumber, productOptions);
                }
            }
        }

        xhr.send(JSON.stringify({
            "request":{
            "requestInfo":{
                "service":"PricingAPI",
                "method":"getPriceForProduct",
                "clientId":"AEM",
                "apiAccessKey":"o7qsuyqmznkscppcdro678vidbr"
            },
            "tenant": productOptions.tenant,
            "productCode": productOptions.productCode,
            "productLevelChannelId": productOptions.productLevelChannelId,
            "subscriptionTerm": productOptions.subscriptionTerm,
            "subscriptionUnit": productOptions.subscriptionUnit,
            "couponCode": productOptions.couponCode,
            "siteId": productOptions.siteId,
            "transactionType": RequestUtils.DEFAULT_TRANSACTION_TYPE,
            "livePricing": RequestUtils.LIVE_PRICING,
            "attributeCode": productOptions.attributeCode,
            "attributeValue": productOptions.attributeValue,
            "skipSessionCoupon": productOptions.skipSessionCoupon
            }
        }))
    }
}
