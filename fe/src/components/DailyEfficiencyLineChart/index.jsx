import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

const DailyEfficiencyLineChart = ({ isDashboard }) => {
  const theme = useTheme();
  const data = [
    {
      id: "SPT 60",
      color: "#1c7b7b",
      data: [
        {
          x: "1",
          y: 90,
        },
        {
          x: "2",
          y: 100,
        },
        {
          x: "3",
          y: 100,
        },
        {
          x: "4",
          y: 100,
        },
        {
          x: "5",
          y: 97,
        },
        {
          x: "6",
          y: 96,
        },
        {
          x: "7",
          y: 100,
        },
        {
          x: "8",
          y: 100,
        },
        {
          x: "9",
          y: 98,
        },
        {
          x: "10",
          y: 100,
        },
        {
          x: "11",
          y: 96,
        },
        {
          x: "12",
          y: 100,
        },
        {
          x: "13",
          y: 90,
        },
        {
          x: "14",
          y: 100,
        },
        {
          x: "15",
          y: 100,
        },
        {
          x: "16",
          y: 100,
        },
        {
          x: "17",
          y: 97,
        },
        {
          x: "18",
          y: 96,
        },
        {
          x: "19",
          y: 100,
        },
        {
          x: "20",
          y: 100,
        },
        {
          x: "21",
          y: 98,
        },
        {
          x: "22",
          y: 100,
        },
        {
          x: "23",
          y: 96,
        },
        {
          x: "24",
          y: 100,
        },
        {
          x: "25",
          y: 100,
        },
        {
          x: "26",
          y: 100,
        },
        {
          x: "27",
          y: 100,
        },
        {
          x: "28",
          y: 100,
        },
        {
          x: "29",
          y: 100,
        },
      ],
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
          min: "50",
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
