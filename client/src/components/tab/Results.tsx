import React, { Component, Fragment } from "react";
import { Box, Typography, Card, CardContent, Container, Divider } from "@material-ui/core";
import "./Results.css";
import { UploadResult } from "../../models/response";
import { Conversations } from "./Conversations";

interface ResultsProps {
    result: UploadResult | null;
}

export class Results extends Component<ResultsProps> {
    private result: UploadResult | null;
    private numConversations: number;

    constructor(props: ResultsProps) {
        super(props);
        this.result = props.result;
        if (this.result === null) {
            this.numConversations = 0;
        } else {
            this.numConversations = this.result.numConversations;
        }
    }

    public render() {
        if (this.result === null) {
            return <Fragment></Fragment>;
        }

        return (
            <Box px={12} pb={8}>
                <Container className="instagram-results">
                    <Box>
                        <Box className="text-center">
                            <Typography variant="h3">Results</Typography>
                            <Container maxWidth="sm">
                                <Box py={2}>
                                    <Divider></Divider>
                                </Box>
                            </Container>
                        </Box>

                        <Box py={4}>
                            <Card>
                                <CardContent>
                                    <Box>
                                        <Typography>
                                            You have{" "}
                                            <span className="emphasized">
                                                {this.numConversations}
                                            </span>{" "}
                                            conversations in Instagram. Of those conversations,{" "}
                                            <span className="emphasized">
                                                {this.result.groups.length}
                                            </span>{" "}
                                            of them are group chats and{" "}
                                            <span className="emphasized">
                                                {this.result.private.length}
                                            </span>{" "}
                                            of them are private messages.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box pb={2}>
                            <Box my={2}>
                                <Typography variant="h5">Private Messages</Typography>
                            </Box>

                            <Conversations isGroup={false} conversations={this.result.private} />

                            <Box my={2}>
                                <Typography variant="h5">Group Chats</Typography>
                            </Box>

                            <Conversations isGroup={true} conversations={this.result.groups} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        );
    }
}
