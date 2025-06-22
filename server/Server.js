import axios from "axios";
import express from "express";
import { Cache } from "../cache/Cache.js";
import getRequstConfig from "../config/RequestConfig.js";

export class Server {
    constructor(options) {
        const { origin, port } = options;
        this.origin = origin;
        this.port = port;
        this.app = express();
    }

    async init() {
        this.initCache();
        this.app.use(express.json());
        this.setRoutes();
    }

    initCache() {
        this.cache = new Cache();
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is started on port ${this.port}...`);
        });

        this.app.on("error", (error) => {
            console.error(`Error starting server: ${error}`);
            throw new Error(error);
        });
    }

    setRoutes() {
        // To handle all requests.
        this.app.get("/{*params}", (req, res) => this.handleRequest(req, res));
    }

    async handleRequest(request, res) {
        // request.path will leave the query params. hence using originalurl.
        const fullUrl = `${this.origin.replace(/\/$/, "")}${request.originalUrl}`;
        console.log("⏩ Forwarding to:", fullUrl);

        try {
            const cachedData = await this.cache?.get(fullUrl);
            if (cachedData) {
                res.setHeader("X-Cache", "HIT");
                console.log("X-Cache: HIT");
                return res.status(200).send(cachedData);
            }

            const config = getRequstConfig(fullUrl);
            const response = await axios(config);
            this.cache?.set(fullUrl, response.data);

            res.setHeader("X-Cache", "MISS");
            console.log("X-Cache: MISS");
            return res.status(response.status).send(response.data);
        } catch (err) {
            console.error("Error fetching from origin:", err.message);
            return res.status(500).json({ error: "Failed to fetch external data" });
        }
    }
}
