import { Application } from "express";

// app-based (global) middleware
export type Middleware = ( (app: Application) => void );