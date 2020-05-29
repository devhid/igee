import React, { FunctionComponent, Fragment } from "react";
import { ActivityTable } from "../analysis/ActivityTable";
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    Divider,
    ExpansionPanelDetails,
    Box,
} from "@material-ui/core";
import { IndividualStatistics } from "../statistics/IndividualStatistics";
import { OverallAnalysis } from "../analysis/OverallAnalysis";
import { TotalStatistics } from "../statistics/TotalStatistics";
import { MonthlyResultsChart } from "../statistics/MonthlyResultsChart";
import { Conversation } from "../../models/conversation";
import { getMonthlyChartData, getMostActiveParticipant } from "../../utils/conversation";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface ConversationsProps {
    conversations: Conversation[];
    isGroup: boolean;
}

export const Conversations: FunctionComponent<ConversationsProps> = (props) => {
    return (
        <Fragment>
            {props.conversations.map((conversation, index) => (
                <ExpansionPanel key={conversation.name}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="subtitle1">
                            <strong>{conversation.name}</strong>
                        </Typography>
                    </ExpansionPanelSummary>
                    <Divider></Divider>
                    <ExpansionPanelDetails>
                        <Box pb={2}>
                            <Box my={1}>
                                <Typography variant="h6">Total Statistics</Typography>
                            </Box>

                            <TotalStatistics
                                isGroup={props.isGroup}
                                data={conversation.statistics.total}
                            />

                            <Box py={3}>
                                <Divider></Divider>
                            </Box>

                            <Box>
                                <Typography variant="h6">Monthly Breakdown</Typography>
                            </Box>

                            <Box mt={1}>
                                <Typography variant="body1">
                                    Here is a monthly breakdown of every participant's number of
                                    messages since the beginning of the conversation.
                                </Typography>
                            </Box>

                            <Box>
                                <div style={{ height: "30rem" }}>
                                    <MonthlyResultsChart
                                        data={getMonthlyChartData(conversation)}
                                        keys={Object.keys(conversation.analysis.individual)}
                                    />
                                </div>
                            </Box>

                            <Box py={3}>
                                <Divider></Divider>
                            </Box>

                            <Box>
                                <Typography variant="h6">Individual Statistics</Typography>
                            </Box>

                            <Box my={2}>
                                <IndividualStatistics data={conversation.statistics.individual} />
                            </Box>

                            <Box py={3}>
                                <Divider></Divider>
                            </Box>

                            <Box>
                                <Typography variant="h6">Analysis</Typography>
                            </Box>

                            <Box my={1}>
                                <OverallAnalysis
                                    mostActiveParticipant={getMostActiveParticipant(conversation)}
                                />
                            </Box>

                            <Box my={2}>
                                <Typography variant="body1">
                                    <strong>When is each participant most active?</strong>
                                </Typography>
                            </Box>

                            <Box>
                                <ActivityTable
                                    participantActivity={conversation.analysis.individual}
                                />
                            </Box>
                        </Box>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </Fragment>
    );
};
