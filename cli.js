import { Command } from "commander";
import { Controller } from "./controllers/Controller.js";

const program = new Command();

program
    .name('Caching Proxy Server')
    .description('A CLI tool that starts a caching proxy server')
    .version('1.0');

program
    .command('load')
    .option('-p, --port <number>', 'Port on which proxy server will run ')
    .requiredOption('-o, --url <string>', 'Url of the server to which requests will be forwarded')
    .action((options) => {
        try {
            const controller = new Controller(options);
            controller.loadUrl();
        } catch (e) {
            console.log(`Could not initialize command: ${e}`);
        }

    });

program.parse();