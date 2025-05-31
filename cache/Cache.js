import NodeCache from "node-cache";

export class Cache {
    constructor(options) {
        this.cache = new NodeCache({ stdTTL: 60 });
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value) {
        this.cache.set(key, value);
    }

    clear() {
        this.cache.flushAll();
    }
}