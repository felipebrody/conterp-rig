//React / Redux / Router
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//DatePicker
import ReactDatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

//Styles
import {
  StyledInputBase,
  SelectContainer,
  SelectBox,
  GridContainer,
  StatBoxContainer,
  GridFiller,
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
import ReactDatePickerComponents from "../../components/ReactDatePickerComponents";

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
import FiltersContainer from "../../components/FiltersContainer";

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
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(
    new Date(`2023-${currentDate.getUTCMonth() + 1}-01`)
  );
  const [endDate, setEndDate] = useState(
    new Date(`2023-${currentDate.getUTCMonth() + 1}-30`)
  );

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
        if (isUserAdm) {
          setSelectedRig(rigs[0].name);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRigEfficiencies();
  }, [selectedMonth, user?.rig_id]);

  const { data } = useFormatEfficienciesBarChart(
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
    selectedRig,
    startDate,
    endDate
  );

  return (
    <>
      <Box height="90%" width="100%" padding="0 2rem">
        {isLoading ? (
          <Loader size="100" />
        ) : (
          <>
            <FiltersContainer
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              currentDate={currentDate}
              rigs={rigs}
              handleRigChange={handleRigChange}
              selectedRig={selectedRig}
              isUserAdm={isUserAdm}
            />

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

              {isNonMobile && <GridFiller />}

              <Box
                gridColumn="span 10"
                gridRow="span 3"
                backgroundColor={theme.palette.grey[400]}
                borderRadius=".25rem"
              >
                <DailyEfficiencyLineChart
                  isDashboard
                  efficiencies={efficiencies}
                  selectedRig={selectedRig}
                  selectedMonth={selectedMonth}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Box>

              {isNonMobile && <GridFiller />}

              {isNonMobile && <GridFiller />}

              {isUserAdm ? (
                <Box
                  gridColumn="span 10"
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
                  gridColumn="span 10"
                  gridRow="span 3"
                  backgroundColor={theme.palette.grey[400]}
                  borderRadius=".25rem"
                  overflow="auto"
                >
                  <ListEfficiencies
                    efficiencies={efficiencies}
                    selectedRig={selectedRig}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </Box>
              )}

              {isNonMobile && <GridFiller />}
            </GridContainer>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
