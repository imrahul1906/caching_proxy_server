## Caching-Proxy-Server
A CLI tool that starts a caching proxy server, it will forward requests to the actual server and cache the responses. If the same request is made again, it will return the cached response instead of forwarding the request to the server.
## Prerequisites-

- **[Node.js](https://nodejs.org/)**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imrahul1906/caching_proxy_server.git
   cd caching_proxy_server
   ```

2. Install the node dependencies:
   ```bash
   npm install
   ```

## Usage

### Starting the Caching Proxy Server

To start the caching proxy server, run the following command:

```bash
node cli.js load --port <number> --origin <url>
```
- `--port`: The port on which the caching proxy server will run.
- `--origin`: The URL of the origin server to which the requests will be forwarded.

Example:

```bash
node cli.js load --port 3000 --origin http://dummyjson.com
```

## CC
https://roadmap.sh/projects/caching-server
