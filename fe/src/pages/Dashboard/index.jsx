//React / Redux / Router
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Styles
import {
  StyledInputBase,
  SelectContainer,
  SelectBox,
  GridContainer,
  StatBoxContainer,
} from "./styles";

//MUI
import {
  Box,
  useMediaQuery,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";

//Components
import Header from "../../components/Header";
import ListEfficiencies from "../../components/ListEfficiencies";
import DailyEfficiencyLineChart from "../../components/DailyEfficiencyLineChart";

import StatBox from "../../components/StatBox";
import BarChart from "../../components/BarChart";

//Services
import EfficienciesServices from "../../services/EfficienciesServices";
import RigsServices from "../../services/RigsServices";

//Utils
import { months } from "../../utils/monthsArray";

//Hooks
import { useStatBox } from "../../hooks/useStatBox";
import { useAuth } from "../../hooks/useAuth";
import useFormatEfficienciesBarChart from "../../hooks/useFormatEfficienciesBarChart";

import Loader from "../../components/Loader";

const Dashboard = ({ dataType = "hours", chartKeys, barChartLegend }) => {
  const user = useSelector((state) => state.user);
  const { isUserAdm } = useAuth();
  const theme = useTheme();

  const getRig = () => {
    if (isUserAdm) {
      return "";
    }

    return user?.rig_name;
  };

  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [efficiencies, setEfficiencies] = useState([]);

  const [filteredEfficiencies, setFilteredEfficiencies] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Junho");
  const [rigs, setRigs] = useState([]);
  const [selectedRig, setSelectedRig] = useState(getRig());
  const [isLoading, setIsLoading] = useState(true);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleRigChange = (event) => {
    const newEfficiencies = efficiencies.filter((efficiency) => {
      return efficiency.rig_name === event.target.value;
    });
    setFilteredEfficiencies(newEfficiencies);
    setSelectedRig(event.target.value);
  };

  //Retirar e usar o hook
  useEffect(() => {
    const loadRigEfficiencies = async () => {
      let efficienciesData = null;
      try {
        efficienciesData = user?.rig_id
          ? await EfficienciesServices.listEfficienciesByRigId(user?.rig_id)
          : await EfficienciesServices.listEfficiencies();
        setEfficiencies(efficienciesData);

        const rigs = await RigsServices.listRigs();
        setRigs(rigs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRigEfficiencies();
  }, [selectedRig, user?.rig_id]);

  const { data } = useFormatEfficienciesBarChart(
    efficiencies,
    selectedMonth,
    selectedRig,
    dataType
  );

  const { statBoxOne, statBoxTwo, statBoxThree } = useStatBox(
    efficiencies,
    selectedMonth,
    selectedRig
  );

  return (
    <>
      <Box height="90%" width="100%" padding="0 2rem">
        {isLoading ? (
          <Loader size="100" />
        ) : (
          <>
            <SelectContainer isNonMobile={isNonMobile}>
              {isUserAdm && (
                <SelectBox isNonMobile={isNonMobile}>
                  <InputLabel id="month" sx={{ color: "#000" }}>
                    SPT:
                  </InputLabel>
                  <Select
                    labelId="month"
                    label=" SPT:"
                    input={<StyledInputBase />}
                    onChange={(event) => handleRigChange(event)}
                    value={selectedRig}
                    size="small"
                    sx={{
                      margin: "auto 0",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: theme.palette.primary[500],
                      width: "50%",
                    }}
                  >
                    {rigs.map(({ id, name }) => (
                      <MenuItem value={name} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </SelectBox>
              )}

              <SelectBox isNonMobile={isNonMobile}>
                <InputLabel id="month" sx={{ color: "#000" }}>
                  Mês :
                </InputLabel>
                <Select
                  labelId="month"
                  label="Mês :"
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
              </SelectBox>
            </SelectContainer>

            <GridContainer isNonMobile={isNonMobile}>
              <StatBoxContainer theme={theme}>
                <StatBox
                  red={false}
                  icon={<EngineeringIcon />}
                  title={`${statBoxOne.hours} Hrs`}
                  subtitle="Horas Disponível"
                  percentage={`${statBoxOne.percentage}%`}
                  progress={statBoxOne.percentage / 100}
                />
              </StatBoxContainer>
              <StatBoxContainer theme={theme}>
                <StatBox
                  red={true}
                  color={theme.palette.red[500]}
                  icon={<HighlightOffOutlinedIcon />}
                  title={`${statBoxTwo.hours} Hrs`}
                  subtitle="Horas Indisponível"
                  percentage={`${statBoxTwo.percentage}%`}
                  progress={statBoxTwo.percentage / 100}
                />
              </StatBoxContainer>
              <StatBoxContainer theme={theme}>
                <StatBox
                  icon={<DataThresholdingIcon />}
                  title={` DTMs: ${statBoxThree.totalDtms}`}
                  subtitle="Quantidade de DTMs no mês"
                  percentage=""
                  progress={0}
                />
              </StatBoxContainer>
              <StatBoxContainer theme={theme}>
                <StatBox
                  icon={<DataThresholdingIcon />}
                  title={`Movimentações: ${statBoxThree.totalDtms}`}
                  subtitle="Movimentações no mês"
                  percentage=""
                  progress={0}
                />
              </StatBoxContainer>
              <Box
                gridColumn={isUserAdm ? "span 6" : "span 8"}
                gridRow={isUserAdm ? "span 2" : "span 3"}
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

              {isUserAdm ? (
                <Box
                  gridColumn="span 6"
                  gridRow="span 3"
                  backgroundColor={theme.palette.grey[400]}
                  borderRadius=".25rem"
                >
                  <BarChart
                    selectedRig={selectedRig}
                    data={data}
                    chartKeys={chartKeys}
                    barChartLegend={barChartLegend}
                    isDashboard
                  />
                </Box>
              ) : (
                <Box
                  gridColumn="span 4"
                  gridRow="span 3"
                  backgroundColor={theme.palette.grey[400]}
                  borderRadius=".25rem"
                  overflow="auto"
                >
                  <ListEfficiencies
                    efficiencies={
                      isUserAdm ? filteredEfficiencies : efficiencies
                    }
                  />
                </Box>
              )}
            </GridContainer>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
