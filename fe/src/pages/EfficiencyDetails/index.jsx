import { useParams } from "react-router-dom";
import EfficienciesServices from "../../services/EfficienciesServices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import toast from "../../utils/toast";
import { useEffect, useState } from "react";
import { DataGridContainer } from "./styles";
import { Box } from "@mui/material";
import Header from "../../components/Header";
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

        /*========================================== */

        let allPeriods = [];

        // Função para adicionar períodos ao array
        const addPeriodsToArray = (periods, type) => {
          periods.forEach((period) => {
            const formattedPeriod = {
              id: period.id,
              start_hour: period.start_hour,
              end_hour: period.end_hour,
              description: period.description,
              classification: period.classification,
              oil_well_name: period.oil_wells_name,
              type: type,
            };
            allPeriods.push(formattedPeriod);
          });
        };

        // Adicionando os períodos de cada tipo ao array
        addPeriodsToArray(efficiencyData.gloss_periods, "Glosa");
        addPeriodsToArray(efficiencyData.repair_periods, "Reparo");
        addPeriodsToArray(efficiencyData.operating_periods, "Operando");
        addPeriodsToArray(efficiencyData.dtm_periods, "DTM");

        // Imprimindo o array com todos os períodos
        console.log("All PEriods =>", allPeriods);
        setRows(allPeriods);

        /*========================================== */

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

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DETALHES DA OPERAÇÃO" subtitle={efficiency?.date} />
      <DataGridContainer>
        <DataGrid getRowId={(row) => row.id} rows={rows} columns={columns} />
      </DataGridContainer>
    </Box>
  );
};

export default EfficiencyDetails;
