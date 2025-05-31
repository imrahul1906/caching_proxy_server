import { Server } from "../server/Server.js";
import { Cache } from "../cache/Cache.js";

export class Controller {
    constructor(options) {
        // TODO (rahul.yadav) Consider multiple urls too.
        const { url } = options;
        this.url = url;
        this.init(options);
    }

    init(options) {
        this.initCache(options);
        this.initServer(options);
    }

    initServer(options) {
        this.server = new Server({ ...options, cache: this.cache });
    }

    initCache(options) {
        this.cache = new Cache(options);
    }

    loadUrl() {
        this.server.loadUrl(this.url);
    }
}