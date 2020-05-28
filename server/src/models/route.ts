import { RequestHandler } from "express";

export type Route = {
    path: string;
    method: string;
    controller: RequestHandler;
    middleware: RequestHandler[];
};
