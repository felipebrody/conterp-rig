import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormatEfficienciesLineChart } from "../../hooks/useFormatEfficienciesLineChart";

const MonthlyEfficiencyPieChart = ({
  isDashboard,
  efficiencies = [],
  selectedRig,
  selectedMonth,
}) => {
  const theme = useTheme();

  const mappedEfficiencies = useFormatEfficienciesLineChart(
    efficiencies,
    selectedMonth
  );

  const data = [
    {
      id: "Disponibilidade",
      label: "Disponibilidade",
      value: 90,
      color: "#1c7b7b",
    },
    {
      id: "nf",
      label: "",
      value: 10,
      color: "#fff",
    },
  ];

  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.85}
        padAngle={0.7}
        cornerRadius={3}
        activeInnerRadiusOffset={9}
        activeOuterRadiusOffset={6}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        arcLabelsSkipAngle={10}
        enableArcLabels={false}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        colors={{ datum: "data.color" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        motionConfig={{
          mass: 5,
          tension: 170,
          friction: 26,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
        legends={
          isDashboard
            ? undefined
            : [
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]
        }
      />
    </>
  );
};

export default MonthlyEfficiencyPieChart;
