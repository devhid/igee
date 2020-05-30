import React, { ChangeEvent } from "react";
import {
    Divider,
    Typography,
    Box,
    Container,
    Card,
    CardContent,
    Button,
    Grid,
    CircularProgress,
} from "@material-ui/core";
import "./Tab.css";
import { Information } from "./Information";
import { Results } from "./Results";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios, { AxiosResponse } from "axios";
import { UploadResult } from "../../models/response";
import { Element } from "react-scroll";

interface UploadFileStateProps {
    result: UploadResult | null;
    uploaded: boolean;
}

export class Tab extends React.Component<{}, UploadFileStateProps> {
    constructor(props: {}) {
        super(props);
        this.state = {
            result: null,
            uploaded: false,
        };

        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    private handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
        event.persist();

        if (event.target.files != null) {
            const formData = new FormData();
            formData.append("data", event.target.files[0]);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };

            this.setState({ uploaded: true });

            axios
                .post("https://mikeygulati.me/upload", formData, config)
                .then((response: AxiosResponse<any>) => {
                    if (response.data && response.data.status === "OK") {
                        this.setState({ result: response.data.result });
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    render() {
        return (
            <Element name="instagram-tab">
                <Box px={12} pt={8} pb={1} className="instagram-tab">
                    <Container maxWidth="md">
                        <Typography className="text-center" variant="h4">
                            Get Started
                        </Typography>
                        <Divider></Divider>

                        <Information />

                        <Box my={4}>
                            <Box my={2}>
                                <Typography variant="h5">How do I start?</Typography>
                            </Box>

                            <Box>
                                <Card>
                                    <CardContent>
                                        <Box>
                                            <Typography>
                                                Upload your <code>messages.json</code> file using
                                                the button below and your results will be displayed
                                                in the <code>Results</code> section. This process
                                                can <strong>take a while</strong> because of the
                                                large amount of data involved (
                                                <strong>~5 minutes</strong>).
                                            </Typography>
                                        </Box>
                                        <br></br>
                                        <Box>
                                            <Typography>
                                                <strong>Note</strong>: There is a maximum file size
                                                of <strong>100 mb</strong>.
                                            </Typography>
                                        </Box>

                                        <Box pt={1}>
                                            <Divider></Divider>
                                        </Box>

                                        <Box mt={1.5}>
                                            <Grid container justify="flex-end" alignItems="center">
                                                {!this.state.result && this.state.uploaded && (
                                                    <Box mr={4}>
                                                        <CircularProgress />
                                                    </Box>
                                                )}
                                                <input
                                                    accept=".json"
                                                    id="file-input"
                                                    multiple={false}
                                                    type="file"
                                                    onChange={this.handleFileUpload}
                                                />
                                                <label htmlFor="file-input">
                                                    <Button
                                                        disabled={
                                                            this.state.uploaded &&
                                                            !this.state.result
                                                        }
                                                        variant="contained"
                                                        color="primary"
                                                        component="span"
                                                        startIcon={<CloudUploadIcon />}
                                                    >
                                                        Upload
                                                    </Button>
                                                </label>
                                            </Grid>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#c13584"
                        fillOpacity="0.8"
                        d="M0,128L60,149.3C120,171,240,213,360,224C480,235,600,213,720,181.3C840,149,960,107,1080,117.3C1200,128,1320,192,1380,224L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    ></path>
                </svg>

                {this.state.result ? (
                    <Results result={this.state.result} />
                ) : (
                    <Box pb={4} className="text-center">
                        <Typography variant="h3">
                            {this.state.uploaded
                                ? "Loading..."
                                : "Upload your file to see results here."}
                        </Typography>
                    </Box>
                )}
            </Element>
        );
    }
}
