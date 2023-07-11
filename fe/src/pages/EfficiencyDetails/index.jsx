import { useParams, Link } from "react-router-dom";
import EfficienciesServices from "../../services/EfficienciesServices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";
import { useEffect, useState } from "react";
import { DataGridContainer } from "./styles";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import EfficiencyMapper from "../../services/mappers/EfficiencyMapper";
import { useFormatDate } from "../../hooks/useFormatDate";
import Modal from "../../components/Modal";
const EfficiencyDetails = () => {
  const { id } = useParams();
  const [efficiency, setEfficiency] = useState(null);
  const [rows, setRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      field: "oil_well_name",
      headerName: "Poço",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { oil_well_name } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> {oil_well_name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "start_hour",
      type: "hour",
      headerName: "Início",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end_hour",
      type: "hour",
      headerName: "Fim",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "classification",
      headerName: "Classificação",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  const navigate = useNavigate();

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

  const date = useFormatDate(efficiency?.date);

  const handleDelete = async (id) => {
    try {
      await EfficienciesServices.deleteEfficiency(id);

      toast({
        type: "sucess",
        text: "Registro deletado com sucesso!",
      });

      navigate(`/user/list-efficiencies`);
    } catch (error) {
      console.log(error);
      toast({
        type: "error",
        text: "Ocorreu um erro ao deletar o registro!",
      });
    }

    setIsModalVisible((prevState) => !prevState);
  };

  const handleModalVisibility = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DETALHES DA OPERAÇÃO"
        subtitle={`${date} - ${efficiency?.rig_name}`}
      />
      <Box
        width="35%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => handleModalVisibility()}
        >
          <Typography color="#fff"> Delete</Typography>
        </Button>
      </Box>
      <DataGridContainer>
        <DataGrid getRowId={(row) => row.id} rows={rows} columns={columns} />
      </DataGridContainer>

      {isModalVisible && (
        <Modal
          title="Excluir o registro?"
          subtitle="Essa ação irá deletar o registro e não poderá ser desfeita."
          handleDelete={handleDelete}
          handleModalVisibility={handleModalVisibility}
          id={id}
        />
      )}
    </Box>
  );
};

export default EfficiencyDetails;
