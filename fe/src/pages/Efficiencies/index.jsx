import {Box, useMediaQuery} from "@mui/material";
//import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';

import Header from "../../components/Header";
import {useSelector} from "react-redux";
import {useAuth} from "../../hooks/useAuth";

import Loader from "../../components/Loader";
import FiltersContainer from "../../components/FiltersContainer";
import {useEfficiencies} from "./useEfficiencies";
import {EfficienciesDataGrid} from "./components/EfficienciesDataGrid";
import {SelectContainer} from "./styles";
import EmptyList from "../../components/EmptyList";

const Efficiencies = () => {
  const {
    formattedItems,
    isLoading,
    startDate,
    endDate,
    currentDate,
    handleStartDateFiltersChange,
    handleEndDateFiltersChange,
  } = useEfficiencies();

  const {isUserAdm} = useAuth();

  const isNonMobile = useMediaQuery("(min-width:800px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LISTAGEM DE EFICIÊNCIA" />

      {isLoading && (
        <Box height="70vh" width="100%" padding="0 2rem">
          <Loader size="100" />
        </Box>
      )}

      <SelectContainer isNonMobile={isNonMobile}>
        <FiltersContainer
          isSelectVisible={false}
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateFiltersChange}
          handleEndDateChange={handleEndDateFiltersChange}
          currentDate={currentDate}
          isUserAdm={isUserAdm}
        />
      </SelectContainer>

      {!isLoading && formattedItems.length > 0 && (
        <EfficienciesDataGrid formattedItems={formattedItems} />
      )}

      {!isLoading && formattedItems.length === 0 && <EmptyList />}
    </Box>
  );
};

export default Efficiencies;
