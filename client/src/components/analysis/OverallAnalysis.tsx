import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import { MostActiveParticipant } from "../../models/analysis";

interface OverallAnalysisProps {
    mostActiveParticipant: MostActiveParticipant;
}

export const OverallAnalysis: FunctionComponent<OverallAnalysisProps> = (props) => {
    return (
        <Typography variant="body1">
            The most active participant is{" "}
            <span className="emphasized">{props.mostActiveParticipant.name}</span> with a total of{" "}
            <span className="emphasized">{props.mostActiveParticipant.numMessages}</span> messages.
        </Typography>
    );
};
