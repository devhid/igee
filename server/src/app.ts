import express, { Application } from "express";
import { Route } from "./models/Route";
import { Middleware } from "./models/middleware";

type ApplicationInputs = {
    host: string; port: number; middleware: Middleware[]; routes: Route[];
}

export class App {
    public app: Application;

    private host: string;
    private port: number;
    private middleware: Middleware[];
    private routes: Route[];

    constructor(appInputs: ApplicationInputs) {
        this.app = express();

        this.host = appInputs.host;
        this.port = appInputs.port;
        this.middleware = appInputs.middleware;
        this.routes = appInputs.routes;

        this.initMiddlewares(this.middleware);
        this.initRoutes(this.routes);
    }

    private initMiddlewares(middleware: Middleware[]): void {
        for (const mw of middleware) {
            mw(this.app);
        }
    }

    private initRoutes(routes: Route[]): void {
        routes.forEach((route) => {
            const { path, method, middleware, controller } = route;
            (this.app as any)[method](path, middleware, controller);
        });
    }

    public listen(): void {
        this.app.listen(this.port, () =>
            console.info(`Listening on http://${this.host}:${this.port}...`)
        );
    }
}
