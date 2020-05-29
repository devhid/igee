import React from "react";
import "./App.css";

import { BrowserRouter, } from "react-router-dom";
import { Tab as InstagramTab } from "../tab/Tab";
import { Landing } from "../landing/Landing";

function App() {
    // const [value, setValue] = React.useState(0);
    // const [brand, setBrand] = React.useState("instagram");

    // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    //     // lets us access event.target fields
    //     event.persist();

    //     setBrand((event.target as HTMLElement).innerText.toLowerCase());
    //     setValue(newValue);
    // };

    return (
        <BrowserRouter>
            <div className="app">
                {/* <Tabs
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
                </Tabs> */}
                <Landing/>
                <InstagramTab/>
                {/* <Switch>
                    <Route path={["/", "/instagram"]} component={InstagramTab}></Route>
                </Switch> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
