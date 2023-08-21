//MUI
import {Box, useMediaQuery} from "@mui/material";

//Components
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import FiltersContainer from "../../components/FiltersContainer";
import {EfficienciesDataGrid} from "./components/EfficienciesDataGrid";
import EmptyList from "../../components/EmptyList";

//Hooks
import {useAuth} from "../../hooks/useAuth";
import {useEfficiencies} from "./useEfficiencies";

import {SelectContainer} from "./styles";

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

      {!isLoading && formattedItems.length === 0 && (
        <EmptyList>
          Não existe nenhum registro no <strong>período</strong> selecionado!
        </EmptyList>
      )}
    </Box>
  );
};

export default Efficiencies;
