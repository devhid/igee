import { PartOfDay } from "../utils/constants";

export type ConversationAnalysis = {
    mostActiveParticipant: string;
    individual: IndividualAnalysis;
};

export type IndividualAnalysis = {
    [participant: string]: {
        mostActiveDuring: PartOfDay;
    };
};

export type MostActiveParticipant = {
    name: string;
    numMessages: number;
};