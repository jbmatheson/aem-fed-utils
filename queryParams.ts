interface QueryParamsMap {
    [key: string]: string;
}

export class QueryParams {
    private queryParamsMap: QueryParamsMap = {};

    constructor(searchParams: string) {
        const paramRegex = /[\?&]([a-zA-Z0-9]*)=([^&#]*)/g;
        let currMatch = paramRegex.exec(searchParams);

        while(currMatch !== null) {
            const queryName = currMatch[1];
            const queryValue = currMatch[2];
            this.queryParamsMap[queryName] = queryValue;

            currMatch = paramRegex.exec(searchParams);
        }
    }

    public getParam = (name: string) => {
        return this.queryParamsMap[name] || '';
    }
}
