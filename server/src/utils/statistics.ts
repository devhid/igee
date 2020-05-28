import { Date } from "./../models/date";
import { Message, getMessageType } from "../models/message";
import { MessageStatistics, ConversationStatistics, MonthlyStatistics, IndividualStatistics } from "../models/statistics";

export function getStatistics(messages: Message[]): ConversationStatistics {
    const total: MessageStatistics = emptyStatistics();
    const monthly: MonthlyStatistics = {};
    const individual: IndividualStatistics = {};

    for (const message of messages) {
        // who sent the message
        const sender = message.sender;

        // type of message
        const messageType = getMessageType(message);

        // date message was sent
        const date = getDate(message.created_at);
        const dateIndex = date.month + "/" + date.year;

        // create empty statistics if sender isn't already found
        if (!(message.sender in individual)) {
            individual[sender] = emptyStatistics();
        }

        // create empty object for date if not already exists
        if (!(dateIndex in monthly)) {
            monthly[dateIndex] = {};
        }

        // create empty statistics for monthly sender if not present for that specific date
        if (!(sender in monthly[dateIndex])) {
            monthly[dateIndex][sender] = { total_messages: 0 };
        }

        // increase monthly messages for that message type and overall total messages
        // monthly[dateIndex][sender][messageType] += 1;
        monthly[dateIndex][sender].total_messages += 1;

        // increase total messages for that message type and overall total messages
        total[messageType] += 1;
        total.total_messages += 1;

        // increase message type count for that individual and overall total messages
        individual[sender][messageType] += 1;
        individual[sender].total_messages += 1;
    }

    return {
        total,
        monthly,
        individual,
    };
}

 // Get date from ISO date.
 function getDate(fromDate: string): Date {
    const date = fromDate.split("T")[0].split("-");

    return {
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10),
        year: parseInt(date[0], 10),
    };
}

function emptyStatistics(): MessageStatistics {
    return {
        total_messages: 0,
        actions: 0,
        gifs: 0,
        hearts: 0,
        live_video_invites: 0,
        media_posts: 0,
        media_shares: 0,
        profile_shares: 0,
        story_shares: 0,
        texts: 0,
        video_calls: 0,
        voice_messages: 0,
    };
}