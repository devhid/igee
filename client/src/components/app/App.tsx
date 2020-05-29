import React from "react";
import "./App.css";

import { Tabs} from "@material-ui/core";
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import { Tab as InstagramTab } from "../tab/Tab";
// import { FacebookTab } from "../tabs/facebook/FacebookTab";
// import { SnapchatTab } from "../tabs/snapchat/SnapchatTab";
import { StyledTab } from "../shared/StyledTab";

function App() {
    const [value, setValue] = React.useState(0);
    const [brand, setBrand] = React.useState("instagram");

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        // lets us access event.target fields
        event.persist();

        setBrand((event.target as HTMLElement).innerText.toLowerCase());
        setValue(newValue);
    };

    return (
        <BrowserRouter>
            <div className="app">
                {/* <Landing />
                <AppDescription /> */}
                <Tabs
                    value={value}
                    TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
                    onChange={handleChange}
                    centered
                    className="tab-container"
                >
                    <StyledTab
                        selected
                        brand={brand === "instagram" ? brand : "default"}
                        label="Instagram"
                        component={Link}
                        to="/instagram"
                    />
                    {/* <StyledTab
                        brand={brand === "facebook" ? brand : "default"}
                        label="Facebook"
                        component={Link}
                        to="/facebook"
                    />
                    <StyledTab
                        brand={brand === "snapchat" ? brand : "default"}
                        label="SnapChat"
                        component={Link}
                        to="/snapchat"
                    /> */}
                </Tabs>

                <Switch>
                    {/* <Route path="/facebook" component={FacebookTab}></Route>
                    <Route path="/snapchat" component={SnapchatTab}></Route> */}
                    <Route path={["/", "/instagram"]} component={InstagramTab}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
