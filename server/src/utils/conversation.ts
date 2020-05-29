import { PreprocessedConversation } from "./../models/conversation";
import { Message, MessageType, ActionMessage, getMessageType } from "../models/message";
import { UploadResult } from "../models/response";
import { getStatistics } from "./statistics";
import { getMostActiveParticipant, getActivityTimes } from "./analysis";
import { DataExport } from "../models/data_export";

// index where to find the group name within a person's action.
const GROUP_NAME_INDEX_OFFSET = 6;

// message categories
const CATEGORY_GROUP = "groups";
const CATEGORY_PRIVATE = "private";

export function process(preprocessedConversation: PreprocessedConversation): UploadResult {
    const result: UploadResult = emptyUploadResult();

    for (const [name, info] of Object.entries(preprocessedConversation)) {
        const messages = info.chatHistory;
        const statistics = getStatistics(messages);
        
        const analysis = {
            mostActiveParticipant: getMostActiveParticipant(statistics.individual),
            individual: getActivityTimes(messages),
        };

        const conversation = {
            name,
            statistics,
            analysis,
        };

        const messageCategory = (info.participants.length > 2 || info.isGroup) ? CATEGORY_GROUP : CATEGORY_PRIVATE;
        
        result[messageCategory].push(conversation);
        result.numConversations += 1;
    }

    return result;
}

export function preprocess(dataExport: DataExport): PreprocessedConversation {
    const preprocessed: PreprocessedConversation = {};

    for (const conversation of dataExport) {
        // skip if conversation is empty.
        if (conversation.conversation.length == 0) {
            continue;
        }

        const participants = conversation.participants;
        const [groupName, isGroup] = getGroupName(conversation.conversation);

        // private name would just be participant's usernames separated by commas
        const privateName = participants.join(", ");

        // check if we already came across this group before
        const name = groupName == null ? privateName : groupName;
        if (!(name in preprocessed)) {
            // if not, add an entry to the object based with the group or private conversation info
            preprocessed[name] = {
                isGroup,
                participants,
                chatHistory: conversation.conversation,
            };
        } else {
            // if so, append chat history
            preprocessed[name].chatHistory.push(...conversation.conversation);
        }
    }

    return preprocessed;
}

function emptyUploadResult(): UploadResult {
    return {
        numConversations: 0,
        private: [],
        groups: []
    }
}

function getGroupName(messages: Message[]): [string, boolean] {
    for (const message of messages) {
        if (getMessageType(message) === MessageType.ACTION) {
            const action = (message as ActionMessage).action;

            if (action.includes("group")) {
                return [action.slice(action.indexOf("group") + GROUP_NAME_INDEX_OFFSET), true];
            }
        }
    }

    return [null, false];
}
