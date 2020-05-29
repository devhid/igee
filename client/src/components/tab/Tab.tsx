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
} from "@material-ui/core";
import "./Tab.css";
import { Information } from "./Information";
import { Results } from "./Results";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios, { AxiosResponse } from "axios";
import { UploadResult } from "../../models/response";

interface UploadFileStateProps {
    result: UploadResult | null;
}

export class Tab extends React.Component<{}, UploadFileStateProps> {
    constructor(props: {}) {
        super(props);
        this.state = {
            result: null
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

            axios
                .post("http://localhost:5000/upload", formData, config)
                .then((response: AxiosResponse<any>) => {
                    if(response.data && response.data.status === "OK") {
                        console.log(response.data.result);
                        this.setState({ result: response.data.result });
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    render() {
        return (
            <React.Fragment>
                <Box px={12} pt={8} pb={1} className="instagram-tab">
                    <Container maxWidth="md">
                        <Typography variant="h4">Instagram</Typography>
                        <Divider></Divider>

                        <Information />

                        <Box my={4}>
                            <Box my={2}>
                                <Typography variant="h5">Get Started</Typography>
                            </Box>

                            <Box>
                                <Card>
                                    <CardContent>
                                        <Box>
                                            <Typography>
                                                Upload your <code>messages.json</code> file using
                                                the button below and your results will be displayed
                                                in the <code>Results</code> section.
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
                                                <input
                                                    accept=".json"
                                                    id="file-input"
                                                    multiple={false}
                                                    type="file"
                                                    onChange={this.handleFileUpload}
                                                />
                                                <label htmlFor="file-input">
                                                    <Button
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

                {this.state.result !== null 
                ? <Results result={this.state.result}/>
                : <Box pb={4} className="text-center"><Typography variant="h3">Upload your file to see results...</Typography></Box>}
            </React.Fragment>
        );
    }
}
