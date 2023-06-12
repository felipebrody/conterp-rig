import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EfficienciesServices from "../../services/EfficienciesServices";
import Header from "../../components/Header";
import ListEfficiencies from "../../components/ListEfficiencies";
import PercentIcon from "@mui/icons-material/Percent";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";

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

import StatBox from "../../components/StatBox";
import { useStatBox } from "../../hooks/useStatBox";

const UserHome = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [efficiencies, setEfficiencies] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Junho");

  const user = useSelector((state) => state.user);

  const getRig = () => {
    if (user?.access_level === "adm") {
      return "SPT 111";
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

  const { statBoxOne, statBoxTwo } = useStatBox(efficiencies, selectedMonth);

  return (
    <>
      <Header title="User Home Page" subtitle="Página de início do usuário." />

      <Box height="90%" width="100%" padding="0 2rem">
        <Box
          width="100%"
          display="flex"
          marginBottom="1rem"
          justifyContent={isNonMobile ? "flex-end" : "space-between"}
          gap="1rem"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent={isNonMobile ? "flex-end" : "flex-start"}
            gap="1rem"
            alignItems="center"
            width={isNonMobile ? "35%" : "50%"}
          >
            <InputLabel id="month" sx={{ color: "#000" }}>
              Mês 1:
            </InputLabel>
            <Select
              labelId="month"
              label="Selecione o Mês"
              input={<StyledInputBase />}
              onChange={(event) => handleMonthChange(event)}
              value={selectedMonth}
              size="small"
              sx={{
                margin: "auto 0",
                borderRadius: "1rem",
                outline: "none",
                backgroundColor: theme.palette.primary[500],
                width: "50%",
              }}
            >
              {months.map((month) => (
                <MenuItem value={month} key={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            border="1px solid blue"
            display="flex"
            justifyContent="center"
            gap="1rem"
            alignItems="center"
            width={isNonMobile ? "25%" : "50%"}
          >
            <InputLabel id="month" sx={{ color: "#000" }}>
              Mês2 :
            </InputLabel>
            <Select
              labelId="month"
              label="Selecione o Mês"
              input={<StyledInputBase />}
              onChange={(event) => handleMonthChange(event)}
              value={selectedMonth}
              size="small"
              sx={{
                margin: "auto 0",
                borderRadius: "1rem",
                outline: "none",
                backgroundColor: theme.palette.primary[500],
                width: "50%",
              }}
            >
              {months.map((month) => (
                <MenuItem value={month} key={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          gridAutoRows="120px"
          sx={{
            "& div": { gridColumn: isNonMobile ? undefined : "span 12" },
          }}
        >
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={theme.palette.grey[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              red={false}
              icon={<EngineeringIcon />}
              title={`${statBoxOne.hours} Hrs`}
              subtitle="Horas Disponível"
              percentage={`${statBoxOne.percentage}%`}
              progress={statBoxOne.percentage / 100}
            />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={theme.palette.grey[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              red={true}
              color={theme.palette.red[500]}
              icon={<HighlightOffOutlinedIcon />}
              title={`${statBoxTwo.hours} Hrs`}
              subtitle="Horas Indisponível"
              percentage={`${statBoxTwo.percentage}%`}
              progress={statBoxTwo.percentage / 100}
            />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={theme.palette.grey[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              icon={<DataThresholdingIcon />}
              title={`${statBoxOne}%`}
              subtitle="Eficiência proporcional ao mês"
              percentage="+12%"
              progress={statBoxOne / 100}
            />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={theme.palette.grey[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`${statBoxOne}%`}
              subtitle="Eficiência proporcional ao mês"
              percentage="+12%"
              progress={statBoxOne / 100}
            />
          </Box>
          <Box
            gridColumn="span 8"
            gridRow="span 3"
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

          <Box
            gridColumn="span 4"
            gridRow="span 3"
            backgroundColor={theme.palette.grey[400]}
            borderRadius=".25rem"
          >
            <ListEfficiencies efficiencies={efficiencies} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserHome;
