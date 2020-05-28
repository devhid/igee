import { ConversationStatistics } from "./statistics";
import { ConversationAnalysis } from "./analysis";
import { Message } from "./message";

export type PreprocessedConversation = {
    [name: string]: {
        isGroup?: boolean;
        participants?: string[];
        chatHistory?: Message[];
    };
}

export type Conversation = {
    name: string;
    statistics: ConversationStatistics;
    analysis: ConversationAnalysis;
};


