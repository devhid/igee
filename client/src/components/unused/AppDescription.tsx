import React from "react";
import { Element } from "react-scroll";
import { Box, Container, Typography, Divider } from "@material-ui/core";
import "./AppDescription.css";

export const AppDescription = () => {
    return (
        <Element name="app-description">
            <Box px={12} py={8} className="app-description">
                <Container maxWidth="md">
                    <Container maxWidth="sm">
                        <Typography variant="h3">How does it work?</Typography>
                        <Box my={2}>
                            <Divider className="light-divider"></Divider>
                        </Box>
                    </Container>
                    <Box py={3}>
                        <Typography variant="body1">
                            The tool will parse your social media conversations, categorize the
                            messages, calculate statistics, and display some analytical information.
                        </Typography>
                    </Box>
                    <Box py={3}>
                        <Typography variant="body1">
                            Some of this information would be{" "}
                            <strong>the number of messages</strong> sent each month by each
                            individual, the <strong>most active participant</strong> in each group,
                            and whether an individual is a <strong>morning or night person</strong>.
                        </Typography>
                    </Box>

                    <Box py={3}>
                        <Typography variant="body1">
                            As of right now, Instagram is the only social media platform that is
                            currently supported. Other platforms like Facebook and SnapChat are in
                            the works.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Element>
    );
};
