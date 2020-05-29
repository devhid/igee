import React from "react";
import clsx from "clsx";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as ScrollableLink } from "react-scroll";

import "./Landing.css";

export const Landing = () => {
    return (
        <Grid container direction="column" justify="center" className="landing">
            <Container className={clsx("content", "main-content")}>
                <Container maxWidth="xs">
                    <Typography variant="h2">
                        <span className="title">igee</span>
                    </Typography>
                </Container>
                <br></br>
                <Container>
                    <Typography>
                        <span className="subtitle">
                            A statistics and analysis tool for your Instagram profile.
                        </span>
                    </Typography>
                </Container>
            </Container>
            <br />
            <br />
            <Container className={clsx("content", "btn-container")}>
                <ScrollableLink to="instagram-tab" delay={50} smooth={true} duration={800}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ExpandMoreIcon />}
                        size="large"
                        className="get-started-btn"
                    >
                        Get Started
                    </Button>
                </ScrollableLink>
            </Container>
        </Grid>
    );
};
