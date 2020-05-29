import React, { Fragment, FunctionComponent } from "react";
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    Divider,
    ExpansionPanelDetails,
    Box,
    Grid,
    Badge,
    Chip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MESSAGE_TYPES } from "../../utils/constants";
import { IndividualStatistics as IndividualStats } from "../../models/statistics";

interface IndividualStatisticsProps {
    data: IndividualStats;
}

export const IndividualStatistics: FunctionComponent<IndividualStatisticsProps> = (props) => {
    return (
        <Fragment>
            {Object.keys(props.data).map((name) => (
            <ExpansionPanel key={name}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                        <strong>{name}</strong>
                    </Typography>
                </ExpansionPanelSummary>
                <Divider></Divider>
                <ExpansionPanelDetails>
                    <Box py={1}>
                        <Grid container direction="row">
                            {Object.keys(props.data[name]).map(
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
                                            badgeContent={
                                                (props.data[name] as any)[
                                                    messageType
                                                ]
                                            }
                                            color="primary"
                                            key={messageType}
                                        >
                                            <Chip label={MESSAGE_TYPES[messageType]} />
                                        </Badge>
                                    )
                            )}
                        </Grid>

                        <Box pt={1}>
                            <Typography variant="body1">
                                <strong>{name}</strong> has a total of{" "}
                                <span className="emphasized">
                                    {props.data[name].total_messages}
                                </span>{" "}
                                messages.
                            </Typography>
                        </Box>
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            ))}
        </Fragment>
    );
};
