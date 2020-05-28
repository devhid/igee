import dotenv from "dotenv";
dotenv.config();

import { App } from "./app";
import { middleware } from "./middleware/common";
import { routes } from "./routes";

const host = process.env.SERVER_HOST || "localhost";
const port = parseInt(process.env.SERVER_PORT, 10) || 3000;

const app = new App({
    host: host,
    port: port,
    middleware: middleware,
    routes: routes,
});

app.listen();
