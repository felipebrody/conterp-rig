import { useParams } from "react-router-dom";
import EfficienciesServices from "../../services/EfficienciesServices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import toast from "../../utils/toast";
import { useEffect, useState } from "react";
import { DataGridContainer } from "./styles";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import EfficiencyMapper from "../../services/mappers/EfficiencyMapper";
import { useFormatDate } from "../../hooks/useFormatDate";
const EfficiencyDetails = () => {
  const { id } = useParams();
  const [efficiency, setEfficiency] = useState(null);
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "oil_well_name",
      headerName: "Poço",
      flex: 0.3,
    },
    {
      field: "start_hour",
      headerName: "Início",
      flex: 0.3,
    },
    {
      field: "end_hour",
      headerName: "Fim",
      flex: 0.3,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 0.3,
    },
    {
      field: "classification",
      headerName: "Classificação",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
  ];

  useEffect(() => {
    let efficiencyData;
    const loadEfficiency = async () => {
      try {
        efficiencyData = await EfficienciesServices.getEfficiencyById(id);

        const allPeriods = EfficiencyMapper.toDataGrid(efficiencyData);

        setRows(allPeriods);

        setEfficiency(efficiencyData);
      } catch (error) {
        console.log(error);
        toast({
          type: "error",
          text: "Erro ao carregar os dados!",
        });
      }
    };

    loadEfficiency();
  }, []);

  console.log("Efficiency From Details", efficiency);
  const date = useFormatDate(efficiency?.date);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DETALHES DA OPERAÇÃO"
        subtitle={`${date} - ${efficiency?.rig_name}`}
      />
      <DataGridContainer>
        <DataGrid getRowId={(row) => row.id} rows={rows} columns={columns} />
      </DataGridContainer>
    </Box>
  );
};

export default EfficiencyDetails;
