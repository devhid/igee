import { ConversationStatistics } from "./statistics";
import { ConversationAnalysis } from "./analysis";

export type Conversation = {
    name: string;
    statistics: ConversationStatistics;
    analysis: ConversationAnalysis;
};


