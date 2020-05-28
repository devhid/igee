import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";

function handleCors(app: Application): void {
    app.use(cors({ credentials: true, origin: true }));
}

function handleHelmet(app: Application): void {
    app.use(helmet());
}

function handleLogging(app: Application): void {
    app.use(logger("dev"));
}

function handleJSONParsing(app: Application): void {
    app.use(express.json({ limit: '100mb' }));
}

function handleURLParsing(app: Application): void {
    app.use(express.urlencoded({ limit: '100mb', parameterLimit: 50000, extended: false }));
}

export const middleware = [handleCors, handleHelmet, handleLogging, handleJSONParsing, handleURLParsing];
