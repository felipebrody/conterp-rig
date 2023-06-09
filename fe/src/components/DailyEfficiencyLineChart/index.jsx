import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EfficienciesServices from "../../services/EfficienciesServices";
import { useFormatEfficienciesLineChart } from "../../hooks/useFormatEfficienciesLineChart";

const DailyEfficiencyLineChart = ({
  isDashboard,
  efficiencies,
  selectedRig,
  selectedMonth,
}) => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const mappedEfficiencies = useFormatEfficienciesLineChart(
    efficiencies,
    selectedMonth
  );

  console.log("Daily Line Mapped Efficiencies", mappedEfficiencies);

  const data = [
    {
      id: selectedRig,
      color: "#1c7b7b",
      data: mappedEfficiencies,
    },
  ];

  return (
    <>
      <ResponsiveLine
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.primary[900],
              },
            },
            legend: {
              text: {
                fill: theme.palette.primary[900],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.primary[900],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.primary[900],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.primary[900],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        colors={{ datum: "color" }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "100",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          /* format: (v) => {
            if (isDashboard) return v.slice(0, 3);
            return v;
          }, */
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Dias", // added
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          //tickValues: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Eficiência",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        lineWidth={4}
        pointSize={11}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={true}
        pointLabel={(e) => {
          //if (e.y === 100) return "";
          return e.y + "%";
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        motionConfig={{
          mass: 1,
          tension: 170,
          friction: 26,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
      />
    </>
  );
};

export default DailyEfficiencyLineChart;
