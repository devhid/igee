import { Conversation } from "./conversation";
import { ResponseStatus } from "../enums/response_status";

export type UploadResult = {
    numConversations: number;
    groups: Conversation[];
    private: Conversation[];
};

export type UploadResponse = {
    status: ResponseStatus;
    result: UploadResult;
};