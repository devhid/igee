import { Conversation } from "./conversation";
import { ResponseStatus } from "../utils/constants";

export type UploadResult = {
    numConversations: number;
    groups: Conversation[];
    private: Conversation[];
};

export type UploadResponse = {
    status: ResponseStatus;
    result: UploadResult;
};