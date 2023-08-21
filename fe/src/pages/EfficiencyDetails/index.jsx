import {useParams} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import Header from "../../components/Header";
import DeleteModal from "../../components/DeleteModal";
import {useEfficiencyDetails} from "./useEfficiencyDetails";
import {useDataGrid} from "./components/DataGrid/useDataGrid";
import {DataGridContainer} from "./styles";
import {EfficiencyDetailsDataGrid} from "./components/DataGrid";
import {PeriodDetailsModal} from "./components/PeriodDetailsModal";
const EfficiencyDetails = () => {
  const {id} = useParams();

  const {
    date,
    efficiency,
    handleDelete,
    handleDeleteModalVisibility,
    isDeleteModalVisible,
    isLoadingRemove,
    isPeriodDetailsModalVisible,
    handlePeriodModalVisibility,
    periodModalDescription,
  } = useEfficiencyDetails(id);

  const {allPeriods} = useDataGrid(efficiency);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DETALHES DA OPERAÇÃO"
        subtitle={`${date} - ${efficiency?.rig_name}`}
      />

      <DataGridContainer>
        <EfficiencyDetailsDataGrid
          allPeriods={allPeriods}
          handlePeriodModalVisibility={handlePeriodModalVisibility}
        />
      </DataGridContainer>

      <Box m="3rem auto" p="5px" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteModalVisibility()}
        >
          <Typography color="#fff"> Deletar registro</Typography>
        </Button>
      </Box>

      {isDeleteModalVisible && (
        <DeleteModal
          title="Excluir o registro?"
          subtitle="Essa ação irá deletar o registro e não poderá ser desfeita."
          handleDelete={handleDelete}
          handleModalVisibility={handleDeleteModalVisibility}
          id={id}
          isLoading={isLoadingRemove}
        />
      )}

      {isPeriodDetailsModalVisible && (
        <PeriodDetailsModal
          title="Descrição"
          subtitle={periodModalDescription}
          handleModalVisibility={handlePeriodModalVisibility}
          id={id}
        />
      )}
    </Box>
  );
};

export default EfficiencyDetails;
