import React, { Fragment, FunctionComponent } from "react";
import { Box, Typography, Grid, Badge, Chip } from "@material-ui/core";
import { MessageStatistics } from "../../models/statistics";
import { MESSAGE_TYPES } from "../../utils/constants";

interface TotalStatisticsProps {
    data: MessageStatistics;
    isGroup: boolean;
}

export const TotalStatistics: FunctionComponent<TotalStatisticsProps> = (props) => {
    const overallMessages = !props.isGroup ? (
        <Typography variant="body1">
            You have exchanged a total of{" "}
            <span className="emphasized">{props.data.total_messages}</span> messages with each
            other.
        </Typography>
    ) : (
        <Typography variant="body1">
            Your group has exchanged a total of{" "}
            <span className="emphasized">{props.data.total_messages}</span> messages.
        </Typography>
    );

    return (
        <Fragment>
            <Box>{overallMessages}</Box>

            <Box py={2}>
                <Typography variant="body1">
                    <strong>Here's the breakdown</strong>:
                </Typography>
            </Box>

            <Box py={1}>
                <Grid container direction="row">
                    {Object.keys(props.data).map(
                        (messageType) =>
                            messageType !== "total_messages" && (
                                <Badge
                                    className="chip-results"
                                    showZero
                                    max={9999}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    badgeContent={(props.data as any)[messageType]}
                                    color="primary"
                                    key={messageType}
                                >
                                    <Chip label={MESSAGE_TYPES[messageType]} />
                                </Badge>
                            )
                    )}
                </Grid>
            </Box>
        </Fragment>
    );
}
