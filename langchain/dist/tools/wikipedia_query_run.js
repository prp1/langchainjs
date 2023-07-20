import { Tool } from "./base.js";
export class WikipediaQueryRun extends Tool {
    constructor(params = {}) {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "wikipedia-api"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "A tool for interacting with and fetching data from the Wikipedia API."
        });
        Object.defineProperty(this, "topKResults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        Object.defineProperty(this, "maxDocContentLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4000
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "https://en.wikipedia.org/w/api.php"
        });
        this.topKResults = params.topKResults ?? this.topKResults;
        this.maxDocContentLength =
            params.maxDocContentLength ?? this.maxDocContentLength;
        this.baseUrl = params.baseUrl ?? this.baseUrl;
    }
    async _call(query) {
        const searchResults = await this._fetchSearchResults(query);
        const summaries = [];
        for (let i = 0; i < Math.min(this.topKResults, searchResults.query.search.length); i += 1) {
            const page = searchResults.query.search[i].title;
            const pageDetails = await this._fetchPage(page, true);
            if (pageDetails) {
                const summary = `Page: ${page}\nSummary: ${pageDetails.extract}`;
                summaries.push(summary);
            }
        }
        if (summaries.length === 0) {
            return "No good Wikipedia Search Result was found";
        }
        else {
            return summaries.join("\n\n").slice(0, this.maxDocContentLength);
        }
    }
    async content(page, redirect = true) {
        try {
            const result = await this._fetchPage(page, redirect);
            return result.extract;
        }
        catch (error) {
            throw new Error(`Failed to fetch content for page "${page}": ${error}`);
        }
    }
    buildUrl(parameters) {
        const nonUndefinedParams = Object.entries(parameters)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, `${value}`]);
        const searchParams = new URLSearchParams(nonUndefinedParams);
        return `${this.baseUrl}?${searchParams}`;
    }
    async _fetchSearchResults(query) {
        const searchParams = new URLSearchParams({
            action: "query",
            list: "search",
            srsearch: query,
            format: "json",
        });
        const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`);
        if (!response.ok)
            throw new Error("Network response was not ok");
        const data = await response.json();
        return data;
    }
    async _fetchPage(page, redirect) {
        const params = new URLSearchParams({
            action: "query",
            prop: "extracts",
            explaintext: "true",
            redirects: redirect ? "1" : "0",
            format: "json",
            titles: page,
        });
        const response = await fetch(`${this.baseUrl}?${params.toString()}`);
        if (!response.ok)
            throw new Error("Network response was not ok");
        const data = await response.json();
        const { pages } = data.query;
        const pageId = Object.keys(pages)[0];
        return pages[pageId];
    }
}
