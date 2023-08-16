import {useSelector} from "react-redux";
//Styles
import {SelectContainer, GridContainer, StatBoxContainer} from "./styles";

//MUI
import {Box, useMediaQuery, useTheme} from "@mui/material";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import StatBox from "../../components/StatBox";

import BillingDataGrid from "./components/BillingDataGrid";
//import BarChart from "../../components/BarChart";

//Hooks
import {useAuth} from "../../hooks/useAuth";

import Loader from "../../components/Loader";
import {useBillingDashboard} from "./BillingDashboardContext/useBillingDashboard";
import FiltersContainer from "../../components/FiltersContainer";
import BarChart from "./components/BarChart";
import EmptyList from "../../components/EmptyList";
import {BillingDashboardProvider} from "./BillingDashboardContext";

export const BillingDashboard = () => {
  const theme = useTheme();

  const totalValue = 10;

  const isNonMobile = useMediaQuery("(min-width:800px)");
  const {
    isLoading,
    rigs,
    efficiencies,
    startDate,
    endDate,
    currentDate,
    handleStartDateFiltersChange,
    handleEndDateFiltersChange,
  } = useBillingDashboard();

  console.log("efficiencies", efficiencies);

  const hasData = efficiencies.length > 0;

  return (
    <Box height="90%" width="100%" padding="0 2rem">
      {isLoading && <Loader size="100" />}

      <SelectContainer isNonMobile={isNonMobile}>
        <FiltersContainer
          isSelectVisible={false}
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateFiltersChange}
          handleEndDateChange={handleEndDateFiltersChange}
          currentDate={currentDate}
          rigs={rigs}
        />
      </SelectContainer>

      {!hasData && <EmptyList />}

      {!isLoading && hasData && (
        <>
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

            <Box
              gridColumn="span 12"
              gridRow="span 4"
              backgroundColor={theme.palette.grey[400]}
              borderRadius=".25rem"
              overflow="auto"
            >
              <BillingDataGrid />
            </Box>

            <Box
              gridColumn="span 12"
              gridRow="span 5"
              backgroundColor={theme.palette.grey[400]}
              borderRadius=".25rem"
            >
              <BarChart
                chartKeys="totalValue"
                barChartLegend="Faturamento"
                isDashboard
                dataType="invoicing"
              />
            </Box>

            <Box
              gridColumn="span 12"
              gridRow="span 5"
              backgroundColor={theme.palette.grey[400]}
              borderRadius=".25rem"
            >
              <BarChart
                chartKeys="availableHours"
                barChartLegend="Horas Disponível"
                isDashboard
                dataType="hours"
              />
            </Box>
          </GridContainer>
        </>
      )}
    </Box>
  );
};
