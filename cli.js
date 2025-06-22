import { Command } from "commander";
import figlet from "figlet";
import { Server } from "./server/Server.js";

const program = new Command();

program
    .name("Caching Proxy Server")
    .description("A CLI tool that starts a caching proxy server")
    .version("1.0")
    .configureHelp({
        formatHelp: (cmd, helper) => {
            const optionLines = cmd.options.map((option) => {
                const term = helper.optionTerm(option);
                const description = helper.optionDescription(option);
                return `  ${term.padEnd(20)} ${description}`;
            });

            return [
                figlet.textSync("Caching Proxy Server"),
                "",
                "Start the caching proxy server",
                "",
                "Commands:",
                "  node cli.js load --url <target> [--port <port>]",
                "",
                "Options:",
                ...optionLines,
                "",
                "Use '--help' with a command for more info",
            ].join("\n");
        },
    })

program
    .command('caching-proxy')
    .option('-p, --port <number>', 'Port on which proxy server will run ')
    .requiredOption('--origin <string>', 'Url of the server to which requests will be forwarded')
    .action((options) => {
        try {
            const server = new Server(options);
            server.init();
            server.startServer();
        } catch (e) {
            console.log(`Could not initialize command: ${e}`);
        }
    });

program.parse();