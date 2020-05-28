import { PartOfDay } from "../enums/part_of_day";

export type ConversationAnalysis = {
    mostActiveParticipant: string;
    individual: IndividualAnalysis;
};

export type IndividualAnalysis = {
    [participant: string]: {
        mostActiveDuring: PartOfDay;
    };
}