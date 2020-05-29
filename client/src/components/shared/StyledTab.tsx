import React from "react";
import { WithStyles, withStyles, Tab } from "@material-ui/core";

interface Styles {
    brand: string;
    [key: string]: any;
}

interface BrandMapping {
    default: string;
    instagram: string;
    facebook: string;
    snapchat: string;
    [key: string]: any;
}

interface TabStyles extends WithStyles<typeof styles> {
    brand: string;
}

const styledBy = (property: string, mapping: BrandMapping) => (props: Styles) =>
    mapping[props[property]];

const styles = {
    selected: {
        background: styledBy("brand", {
            default: "#333",
            instagram: "rgba(88, 81, 219)",
            // instagram: "linear-gradient(to bottom, rgba(88, 81, 219, 0.8), rgba(131, 58, 180, 0.8), rgba(193, 53, 132, 0.8))",
            facebook: "#3b5998",
            snapchat: "#fffc00",
        }),
        color: styledBy("brand", {
            default: "#eee",
            instagram: "#eee",
            facebook: "#eee",
            snapchat: "#333",
        }),
        "border-top-left-radius": "0.3rem",
        "border-top-right-radius": "0.3rem",
    },
};

export const StyledTab = withStyles(styles)(({ classes, brand, ...other }: TabStyles) => (
    <Tab className={classes.selected} {...other} />
));