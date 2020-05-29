import React, { Fragment } from "react";
import { Box, Typography, Card, CardContent, List, Chip, Link } from "@material-ui/core";

export const Information = () => {
    const messageTypes = [
        "Actions",
        "GIFs",
        "Hearts",
        "Live Video Invites",
        "Media Posts",
        "Media Shares",
        "Profile Shares",
        "Story Shares",
        "Regular Texts",
        "Video Calls",
        "Voice Messages",
    ];

    return (
        <Fragment>
            <Box my={4}>
                <Box my={2}>
                    <Typography variant="h5">What will I see?</Typography>
                </Box>
                <Card>
                    <CardContent>
                        <Box>
                            <Typography variant="body1">
                                Instagram has <strong>two</strong> types of conversations,{" "}
                                <strong>group chats</strong> and <strong>private messages</strong>.
                                The analyzer will identify both types of conversations and with each
                                conversation, it will display statistics on the number and type of
                                messages each individual has sent.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Box my={4}>
                <Box my={2}>
                    <Typography variant="h5"> What types of messages?</Typography>
                </Box>
                <Box className="chip-container">
                    <List>
                        {messageTypes.map((text, index) => (
                            <Chip className="chip" label={text} key={text} />
                        ))}
                    </List>
                </Box>
            </Box>

            <Box my={4}>
                <Box my={2}>
                    <Typography variant="h5">What do I need?</Typography>
                </Box>
                <Card>
                    <CardContent>
                        <Box>
                            <Typography variant="body1">
                                You will need to download your data export provided by Instagram. If
                                you do not know how to, you can follow Instagram's instructions{" "}
                                <Link href="https://help.instagram.com/181231772500920">here</Link>.
                            </Typography>
                        </Box>
                        <br></br>
                        <Box>
                            <Typography variant="body1">
                                This data export will have three compressed folders (usually a{" "}
                                <code>.zip</code> folder) containing your data. Look for the zip
                                suffixed with <code>part_1</code>, extract its contents, and upload
                                the <code>messages.json</code> file in that folder. This file
                                contains all of the current existing conversations you have on
                                Instagram.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Fragment>
    );
};
