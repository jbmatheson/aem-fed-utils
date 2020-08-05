import 'isomorphic-fetch';
import 'es6-promise/auto';

/**
 * Helper class to store our utility functions for making ajax requests
 */
export class RequestUtils {

    /**
     * Utility method that automatically parses JSON back from a request made
     * Automatically catches errors during the request
     * @param {string} url
     * @returns {Promise<any | void>}
     */
    public static makeJSONRequest = (url: string) => {
        return fetch(url)
            .then((response: Response) => {
                if(response.ok) {
                    return response.json();
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
}

