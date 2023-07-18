//React / Redux / Router
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//DatePicker
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

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

import EngineeringIcon from "@mui/icons-material/Engineering";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

//Components
import Header from "../../components/Header";
import ListEfficiencies from "../../components/ListEfficiencies";
import DailyEfficiencyLineChart from "../../components/DailyEfficiencyLineChart";
import StatBox from "../../components/StatBox";

import BillingDataGrid from "../../components/BillingDataGrid";
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
import ReactDatePickerComponents from "../../components/ReactDatePickerComponents";

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
  const [startDate, setStartDate] = useState(new Date("2023-06-02"));
  const [endDate, setEndDate] = useState(new Date("2023-07-01"));
  const [currentDate] = useState(new Date());

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

  const { data, totalValue } = useFormatEfficienciesBarChart(
    efficiencies,
    selectedMonth,
    selectedRig,
    startDate,
    endDate,
    dataType
  );

  const { statBoxOne, statBoxTwo, statBoxThree } = useStatBox(
    efficiencies,
    selectedMonth,
    selectedRig
  );

  registerLocale("ptBR", ptBR);

  return (
    <>
      <Box height="90%" width="100%" padding="0 2rem">
        {isLoading ? (
          <Loader size="100" />
        ) : (
          <>
            <SelectContainer isNonMobile={isNonMobile}>
              {/* {isUserAdm && (
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
              )} */}

              <ReactDatePickerComponents
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                currentDate={currentDate}
              />
            </SelectContainer>

            <GridContainer isNonMobile={isNonMobile}>
              <StatBoxContainer theme={theme}>
                <StatBox
                  red={false}
                  icon={<AttachMoneyIcon />}
                  title={`TOTAL`}
                  subtitle="Faturamento Total no mês"
                  percentage={`R$ ${totalValue.toLocaleString()}`}
                  //progress={90 / 100}
                />
              </StatBoxContainer>

              {/* <StatBoxContainer theme={theme}>
                <StatBox
                  red={false}
                  icon={<EngineeringIcon />}
                  title={`PLACEHOL`}
                  subtitle="Horas Disponível"
                  percentage={`R$ 2000000`}
                  progress={90 / 100}
                />
              </StatBoxContainer>
              <StatBoxContainer theme={theme}>
                <StatBox
                  red={false}
                  icon={<EngineeringIcon />}
                  title={`PLACEHOL`}
                  subtitle="Horas Disponível"
                  percentage={`R$ 2000000`}
                  progress={90 / 100}
                />
              </StatBoxContainer> */}

              <Box
                gridColumn="span 12"
                gridRow="span 4"
                backgroundColor={theme.palette.grey[400]}
                borderRadius=".25rem"
                overflow="auto"
              >
                <BillingDataGrid
                  selectedMonth={selectedMonth}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Box>

              <Box
                gridColumn="span 12"
                gridRow="span 5"
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
            </GridContainer>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
