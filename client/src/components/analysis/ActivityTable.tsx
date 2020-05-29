import React, { FunctionComponent } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { IndividualAnalysis } from "../../models/analysis";

interface ActivityTableProps {
    participantActivity: IndividualAnalysis;
}

export const ActivityTable: FunctionComponent<ActivityTableProps> = (props) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Participant</TableCell>
                    <TableCell>Most Active During</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(props.participantActivity).map((participant) => (
                    <TableRow key={participant}>
                        <TableCell>{participant}</TableCell>
                        <TableCell>
                            {props.participantActivity[participant].mostActiveDuring}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}