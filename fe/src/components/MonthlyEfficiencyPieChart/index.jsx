import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EfficienciesServices from "../../services/EfficienciesServices";
import { useFormatEfficienciesLineChart } from "../../hooks/useFormatEfficienciesLineChart";

const DailyEfficiencyLineChart = ({
  isDashboard,
  efficiencies = [],
  selectedRig,
}) => {
  const theme = useTheme();

  const [selectedMonth, setSelectedMonth] = useState("June");

  const mappedEfficiencies = useFormatEfficienciesLineChart(
    efficiencies,
    selectedMonth
  );

  console.log(mappedEfficiencies);

  const data = [
    {
      id: selectedRig,
      color: "#1c7b7b",
      data: mappedEfficiencies,
    },
  ];

  return <></>;
};

export default DailyEfficiencyLineChart;
