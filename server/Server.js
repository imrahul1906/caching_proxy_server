import axios from "axios";
import express, { response } from "express"
import cors from "cors";
import getRequstConfig from "../config/RequestConfig.js";

export class Server {
    constructor({ port = 3000, cache = null }) {
        this.port = port;
        this.cache = cache;

        this.app = express();

        // this is a middleware used to parse the json passed in request body.
        // Needed if body is passed in request.
        this.app.use(express.json())

        this.startServer();
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is started on port: ${this.port}`);
        });

        this.app.on('error', (error) => {
            console.log(`Error occured while starting server: ${error}`);
            throw new Error(error);
        })
    }

    loadUrl(url) {
        this.app.get("/", (req, res) => this.handleRequest(req, res, url));
    }

    async handleRequest(request, res, url) {
        try {
            // Check if data is already there in cache
            const cachedData = this.cache?.get(url);
            if (cachedData) {
                res.setHeader('X-Cache', 'HIT');
                console.log('X-Cache: HIT');
                return res.status(200).send(cachedData);
            }

            const config = getRequstConfig(url)
            const response = await axios(config);
            this.cache?.set(url, response.data);
            res.setHeader('X-Cache', 'MISS');
            console.log('X-Cache: MISS');
            return res.status(response.status).send(response.data);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch external data' });
            throw new Error(err);
        }
    }
}