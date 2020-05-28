import { Message } from "./message";

export type DataExport = {
    participants: string[];
    conversation: Message[];
}[];