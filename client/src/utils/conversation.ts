import { Conversation } from "../models/conversation";import { MonthlyChartData } from "../models/statistics";import { MostActiveParticipant } from "../models/analysis";

export function getMonthlyChartData(conversation: Conversation): MonthlyChartData {
    const data: MonthlyChartData = [];

    for (const date of Object.keys(conversation.statistics.monthly)) {
        const participants: string[] = Object.keys(conversation.statistics.monthly[date]);
        let dataObject: any = {};

        for (const participant of participants) {
            let totalMessages =
                conversation.statistics.monthly[date][participant].total_messages;
            dataObject[participant] = totalMessages;
        }

        dataObject["date"] = date;
        data.push(dataObject);
    }

    return data;
}

export function getMostActiveParticipant(conversation: Conversation): MostActiveParticipant {
    const mostActive = conversation.analysis.mostActiveParticipant;

    return {
        name: mostActive,
        numMessages: conversation.statistics.individual[mostActive].total_messages as number,
    };
}
