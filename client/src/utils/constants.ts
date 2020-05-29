export enum PartOfDay {
    MORNING = "Morning", AFTERNOON = "Afternoon", NIGHT = "Night", LATE_NIGHT = "Late Night"
    // 6am to 11:59:59am, 12pm to 5:59:59pm, 6pm to 11:59:59pm, 12am to 5:59:59am
}

export enum ResponseStatus {
    OK = "OK", ERROR = "error"
}

export const MESSAGE_TYPES: { [messageType: string] : string } = {
    actions: "Actions",
    gifs: "GIFs",
    hearts: "Hearts",
    live_video_invites: "Live Video Invites",
    media_posts: "Media Posts",
    media_shares: "Media Shares",
    profile_shares: "Profile Shares",
    story_shares: "Story Shares",
    texts: "Texts",
    total_messages: "Total Messages",
    video_calls: "Video Calls",
    voice_messages: "Voice Messages",
};