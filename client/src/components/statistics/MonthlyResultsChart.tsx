import React, { FunctionComponent } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { MonthlyChartData } from "../../models/statistics";

interface MonthlyResultsProps {
    data: MonthlyChartData;
    keys: string[];
}

export const MonthlyResultsChart: FunctionComponent<MonthlyResultsProps> = (props) => {
    return (
        <ResponsiveBar
            data={props.data}
            keys={props.keys}
            indexBy="date"
            margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            layout="horizontal"
            colors={{ scheme: "paired" }}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Messages",
                legendPosition: "middle",
                legendOffset: 36,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
                legendPosition: "middle",
                legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    );
};
