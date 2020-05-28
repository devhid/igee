import { RequestHandler, Request, Response, NextFunction } from "express";
import { UploadResponse } from "../../models/response";
import { ResponseStatus } from "../../enums/response_status";
import { preprocess, process } from "../../utils/conversation";

export function upload(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const username = req.body.username || "gulattii";
        if (!req.file || !username) {
            return res.json({ status: "error" });
        }

        const preprocessedConversation = preprocess(JSON.parse(req.file.buffer.toString("utf-8")));

        const response: UploadResponse = {
            status: ResponseStatus.OK,
            result: process(preprocessedConversation),
        };

        // @TODO replace with error success messages
        return res.json(response);
    };
}
