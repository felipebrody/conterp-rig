import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EfficienciesServices from "../../services/EfficienciesServices";
import Header from "../../components/Header";

import DailyEfficiencyLineChart from "../../components/DailyEfficiencyLineChart";
import MonthlyEfficiencyPieChart from "../../components/MonthlyEfficiencyPieChart";
import { months } from "../../utils/monthsArray";
import { StyledInputBase } from "./styles";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const UserHome = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [efficiencies, setEfficiencies] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Maio");
  const user = useSelector((state) => state.user);

  const getRig = () => {
    if (user?.access_level === "adm") {
      return "";
    } else {
      return user?.rig_name;
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const [selectedRig, setSelectedRig] = useState(getRig());

  useEffect(() => {
    const loadRigEfficiencies = async () => {
      let efficienciesData = null;
      try {
        efficienciesData = user?.rig_id
          ? await EfficienciesServices.listEfficienciesByRigId(user?.rig_id)
          : await EfficienciesServices.listEfficiencies();
        setEfficiencies(efficienciesData);

        console.log("eeficiency coming from user home", efficienciesData);
      } catch (error) {
        console.log(error);
      }
    };

    loadRigEfficiencies();
  }, []);

  return (
    <>
      <Header title="User Home Page" subtitle="Página de início do usuário." />

      <Box height="90%" width="100%" padding="2rem">
        <InputLabel id="repair-classification">Classificação</InputLabel>
        <Select
          labelId="repair-classification"
          label="Classificação"
          input={<StyledInputBase />}
          onChange={(event) => handleMonthChange(event)}
          value={selectedMonth}
          size="small"
          sx={{
            margin: "auto 0",
            borderRadius: "1rem",
            outline: "none",
            backgroundColor: theme.palette.primary[500],
          }}
        >
          {months.map((month) => (
            <MenuItem value={month} key={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          gridAutoRows="160px"
          sx={{
            "& div": { gridColumn: isNonMobile ? undefined : "span 12" },
          }}
        >
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={theme.palette.grey[400]}
          >
            <MonthlyEfficiencyPieChart
              isDashboard
              efficiencies={efficiencies}
              selectedRig={selectedRig}
              selectedMonth={selectedMonth}
            />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={theme.palette.grey[400]}
          >
            <MonthlyEfficiencyPieChart
              isDashboard
              efficiencies={efficiencies}
              selectedRig={selectedRig}
              selectedMonth={selectedMonth}
            />
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={theme.palette.grey[400]}
            borderRadius=".25rem"
          >
            <DailyEfficiencyLineChart
              isDashboard
              efficiencies={efficiencies}
              selectedRig={selectedRig}
              selectedMonth={selectedMonth}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserHome;
