import {ResponsiveBar} from "@nivo/bar";
import {useTheme} from "@mui/material";
import {useBarChart} from "./useBarChart";

const BarChart = ({dataType, isDashboard, chartKeys, barChartLegend}) => {
  const {data} = useBarChart(dataType);

  const theme = useTheme();
  return (
    <ResponsiveBar
      data={data}
      keys={[chartKeys]}
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
      indexBy="rig"
      margin={{top: 50, right: 50, bottom: 50, left: 60}}
      padding={0.3}
      valueScale={{type: "linear"}}
      indexScale={{type: "band", round: true}}
      colors={({data}) => (data.highlight ? "#38bcb2" : "#1c7b7b")}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      /* fill={[
        {
          match: (bar) => bar.id === selectedRig, // Condição para a cor de destaque
          id: "highlight-color", // ID para referenciar o estilo de cor de destaque
        },
      ]} */
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      valueFormat={
        chartKeys === "totalValue"
          ? (value) => `R$ ${value.toLocaleString()}`
          : (value) => `${value} Hrs`
      }
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: barChartLegend,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#fff"
      onClick={(e) => console.log(e)}
      legends={
        isDashboard
          ? undefined
          : [
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
            ]
      }
      role="application"
      ariaLabelTextColor="#000"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default BarChart;
