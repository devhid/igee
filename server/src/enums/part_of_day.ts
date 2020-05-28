export enum PartOfDay {
    MORNING = "Morning", AFTERNOON = "Afternoon", NIGHT = "Night", LATE_NIGHT = "Late Night"
    // 6am to 11:59:59am, 12pm to 5:59:59pm, 6pm to 11:59:59pm, 12am to 5:59:59am
    // 6 to 11:59:59.999999, 12 to 17:59:59.999999, 18 to 23:59:59.999999, 0 to 5:59:59.9999999
}