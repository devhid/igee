export enum MessageType {
    ACTION = "actions",
    ANIMATED = "gifs",
    HEART = "hearts",
    LIVE_VIDEO_INVITE = "live_video_invites",
    MEDIA = "media_posts",
    MEDIA_SHARE = "media_shares",
    PROFILE_SHARE = "profile_shares",
    STORY_SHARE = "story_shares",
    TEXT_MESSAGE = "texts",
    VIDEO_CALL = "video_calls",
    VOICE = "voice_messages",
}

export function getMessageType(message: Message): MessageType {
    const functions = [
        isActionMessage,
        isAnimatedMessage,
        isHeartMessage,
        isLiveVideoInviteMessage,
        isMediaMessage,
        isMediaShareMessage,
        isProfileShareMessage,
        isStoryShareMessage,
        isTextMessage,
        isVideoCallMessage,
        isVoiceMessage,
    ];
    for (const f of functions) {
        const type = f(message);
        if (type != null) {
            return type;
        }
    }

    throw new Error();
}

export function isActionMessage(message: Message): MessageType | null {
    return "action" in message ? MessageType.ACTION : null;
}

export function isAnimatedMessage(message: Message): MessageType | null {
    return "animated_media_images" in message ? MessageType.ANIMATED : null;
}

export function isHeartMessage(message: Message): MessageType | null {
    return "heart" in message ? MessageType.HEART : null;
}

export function isLiveVideoInviteMessage(message: Message): MessageType | null {
    return "live_video_invite" in message ? MessageType.LIVE_VIDEO_INVITE : null;
}

export function isMediaMessage(message: Message): MessageType | null {
    return "media" in message ? MessageType.MEDIA : null;
}

export function isMediaShareMessage(message: Message): MessageType | null {
    return ["media_owner", "media_share_caption", "media_share_url", "media_url"].some(
        (key) => key in message
    )
        ? MessageType.MEDIA_SHARE
        : null;
}

export function isProfileShareMessage(message: Message): MessageType | null {
    return ["profile_share_name", "profile_share_username"].every((key) => key in message)
        ? MessageType.PROFILE_SHARE
        : null;
}

export function isStoryShareMessage(message: Message): MessageType | null {
    return "story_share" in message ? MessageType.STORY_SHARE : null;
}

export function isTextMessage(message: Message): MessageType | null {
    return "text" in message ? MessageType.TEXT_MESSAGE : null;
}

export function isVideoCallMessage(message: Message): MessageType | null {
    return "video_call_action" in message ? MessageType.VIDEO_CALL : null;
}

export function isVoiceMessage(message: Message): MessageType | null {
    return "voice_media" in message ? MessageType.VOICE : null;
}

export type Message =
    | ActionMessage
    | AnimatedMessage
    | HeartMessage
    | LiveVideoInviteMessage
    | MediaMessage
    | MediaShareMessage
    | ProfileShareMessage
    | StoryShareMessage
    | TextMessage
    | VideoCallMessage
    | VoiceMessage;

export type BaseMessage = {
    sender: string;
    created_at: string;
};

export type ActionMessage = {
    action: string;
} & BaseMessage;

export type AnimatedMessage = {
    animated_media_images: {};
    is_random?: boolean;
    likes?: { username: string; date: string };
    user?: {};
} & BaseMessage;

export type HeartMessage = {
    heart: string;
} & BaseMessage;

export type LiveVideoInviteMessage = {
    live_video_invite: string;
} & BaseMessage;

export type MediaMessage = {
    media: string;
    likes?: { username: string; date: string };
} & BaseMessage;

export type MediaShareMessage = {
    media_owner: string;
    media_share_caption: string;
    media_share_url: string;
    likes?: { username: string; date: string };
    text?: string;
} & BaseMessage;

export type ProfileShareMessage = {
    profile_share_name: string;
    profile_share_username: string;
    likes?: { username: string; date: string };
    text?: string;
} & BaseMessage;

export type StoryShareMessage = {
    story_share: string;
    story_share_type?: string;
    mentioned_username?: string;
    likes?: { username: string; date: string };
    text?: string;
} & BaseMessage;

export type TextMessage = {
    text: string;
} & BaseMessage;

export type VideoCallMessage = {
    video_call_action: string;
} & BaseMessage;

export type VoiceMessage = {
    voice_media: string;
} & BaseMessage;
