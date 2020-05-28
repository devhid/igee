import { IndividualTimeStatistics, TimeStatistics } from "./../models/statistics";
import { IndividualStatistics, MessageStatistics } from "../models/statistics";
import { Message } from "../models/message";
import { IndividualAnalysis } from "../models/analysis";
import { PartOfDay } from "../enums/part_of_day";
import { Time } from "../models/time";

/* 6am to 11:59:59am */
const MORNING_START = { hour: 6, minute: 0, second: 0 };
const MORNING_END = { hour: 11, minute: 59, second: 59 };

/* 12pm to 5:59:59pm */
const AFTERNOON_START = { hour: 12, minute: 0, second: 0 };
const AFTERNOON_END = { hour: 17, minute: 59, second: 59 };

/* 6pm to 11:59:59pm */
const NIGHT_START = { hour: 18, minute: 0, second: 0 };
const NIGHT_END = { hour: 23, minute: 59, second: 59 };

/* 12am to 5:59:59am */
const LATE_NIGHT_START = { hour: 0, minute: 0, second: 0 };
const LATE_NIGHT_END = { hour: 5, minute: 59, second: 59 };

const PART_OF_DAY_MAPPING: { [type: string]: PartOfDay } = {
    "morning": PartOfDay.MORNING,
    "afternoon": PartOfDay.AFTERNOON,
    "night": PartOfDay.NIGHT,
    "late_night": PartOfDay.LATE_NIGHT
} ;

// Get most active participant in the conversation based on their total messages.
export function getMostActiveParticipant(statistics: IndividualStatistics): string {
    const participants = Object.keys(statistics);

    // return null if there are no participants
    if (participants.length === 0) {
        return null;
    }

    let mostActive = participants[0];

    for (let i = 1; i < participants.length; i++) {
        let participant = participants[i];

        if (statistics[participant].total_messages > statistics[mostActive].total_messages) {
            mostActive = participant;
        }
    }

    return mostActive;
}

export function getActivityTimes(messages: Message[]): IndividualAnalysis {
    const activityTimes: IndividualAnalysis = {};
    const its: IndividualTimeStatistics = getIndividualTimeStatistics(messages);

    for (const [participant, counts] of Object.entries(its)) {
        const maxKey = Object.keys(its).reduce((a: string, b: string) => its[a] > its[b] ? a : b);

        activityTimes[participant] = {
            mostActiveDuring: PART_OF_DAY_MAPPING[maxKey],
        };
    }

    return activityTimes;
}

function getIndividualTimeStatistics(messages: Message[]): IndividualTimeStatistics {
    const individualTimeStatistics: IndividualTimeStatistics = {};

    for (const message of messages) {
        const sender = message.sender;
        
        if (!(sender in individualTimeStatistics)) {
            individualTimeStatistics[sender] = emptyTimeStatistics();
        }
        
        const time = getTime(message.created_at);
        updateTimeCount(individualTimeStatistics, sender, time);
    }

    return individualTimeStatistics;
}

function updateTimeCount(individualTimeStatistics: IndividualTimeStatistics, sender: string, time: Time): void {
    if (isBetween(MORNING_START, MORNING_END, time)) {
        individualTimeStatistics[sender].morning += 1;
    } else if (isBetween(AFTERNOON_START, AFTERNOON_END, time)) {
        individualTimeStatistics[sender].afternoon += 1;
    } else if (isBetween(NIGHT_START, NIGHT_END, time)) {
        individualTimeStatistics[sender].night += 1;
    } else if (isBetween(LATE_NIGHT_START, LATE_NIGHT_END, time)) {
        individualTimeStatistics[sender].late_night += 1;
    }
}

function emptyTimeStatistics(): TimeStatistics {
    return {
        morning: 0,
        afternoon: 0,
        night: 0,
        late_night: 0,
    };
}

function getTime(fromDate: string): Time {
    const time = fromDate.split("T")[1].split(".")[0].split(":");

    return {
        hour: parseInt(time[0], 10),
        minute: parseInt(time[1], 10),
        second: parseInt(time[2], 10),
    };
}

function isBetween(startTime: Time, endTime: Time, checkTime: Time) {
    return (
        startTime.hour <= checkTime.hour &&
        checkTime.hour <= endTime.hour &&
        startTime.minute <= checkTime.minute &&
        checkTime.minute <= endTime.minute &&
        startTime.second <= checkTime.second &&
        checkTime.second <= endTime.second
    );
}
