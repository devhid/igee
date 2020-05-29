export type MessageStatistics = {
    actions?: number;
    gifs?: number;
    hearts?: number;
    live_video_invites?: number;
    media_posts?: number;
    media_shares?: number;
    profile_shares?: number;
    story_shares?: number;
    texts?: number;
    total_messages?: number;
    video_calls?: number;
    voice_messages?: number;
};

export type IndividualStatistics = {
    [participant: string]: MessageStatistics;
}

export type MonthlyStatistics = {
    [date: string]: IndividualStatistics;
}

export type ConversationStatistics = {
    total: MessageStatistics;
    monthly: MonthlyStatistics;
    individual: IndividualStatistics;
};

export type MonthlyChartData = {
    date: string;
    [key: string]: any;
}[];

// export type IndividualTimeStatistics = {
//     [participant: string]: TimeStatistics;
// }

// export type TimeStatistics = {
//     [morning: string]: number;
//     afternoon: number;
//     night: number;
//     late_night: number;
// }