import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
//import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import toast from "../../utils/toast";
import EfficienciesServices from "../../services/EfficienciesServices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useFormatEfficienciesArray } from "../../hooks/useFormatEfficienciesArray";
import { DataGridContainer } from "./styles";
import { Link } from "react-router-dom";

const Efficiencies = () => {
  const [efficiencies, setEfficiencies] = useState([]);

  const columns = [
    {
      field: "rig_name",
      headerName: "Sonda",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: ({ row: { rig_name } }) => {
        return (
          <Box
            width="40%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> {rig_name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Data",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      type: "date",
    },
    {
      field: "available_hours",
      headerName: "Hora Disponível",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: ({ row: { available_hours } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> {available_hours}Hrs</Typography>
          </Box>
        );
      },
    },
    {
      field: "hasRepairHours",
      headerName: "Hora Reparo",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { hasRepairHours } }) => {
        return (
          <Box
            width="35%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            {hasRepairHours ? (
              <CheckCircleOutlineTwoTone fontSize="large" />
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    {
      field: "hasGlossHours",
      headerName: "Hora Glosa",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { hasGlossHours } }) => {
        return (
          <Box
            width="35%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            {hasGlossHours ? (
              <CheckCircleOutlineTwoTone fontSize="large" />
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    {
      field: "efficiency",
      headerAlign: "center",
      headerName: "Eficiência",
      flex: 1,
      renderCell: ({ row: { efficiency } }) => {
        return (
          <Box
            width="35%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> {efficiency?.toFixed(2)}%</Typography>
          </Box>
        );
      },
    },
    {
      field: "id",
      headerAlign: "center",
      headerName: "Detalhes",
      flex: 0.5,
      renderCell: ({ row: { efficiency_id } }) => {
        return (
          <Box
            width="35%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Link to={`/user/list-efficiencies/details/${efficiency_id}`}>
              <Button variant="contained" color="success">
                <Typography color="#fff"> Ver Mais</Typography>
              </Button>
            </Link>
          </Box>
        );
      },
    },
  ];

  const user = useSelector((state) => state.user);
  console.log("Efficiencies from Database ===>", efficiencies);
  const formattedItems = useFormatEfficienciesArray(efficiencies);

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  console.log("formatedd items ===>", formattedItems);

  useEffect(() => {
    setIsLoading(true);
    const loadEfficiencies = async () => {
      let efficienciesData = null;
      try {
        efficienciesData = user?.rig_id
          ? await EfficienciesServices.listEfficienciesByRigId(user?.rig_id)
          : await EfficienciesServices.listEfficiencies();
        setEfficiencies(efficienciesData);
      } catch (error) {
        toast({
          type: "error",
          text: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadEfficiencies();
  }, [user?.rig_id]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LISTAGEM DE EFICIÊNCIA" />

      <DataGridContainer theme={theme}>
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.efficiency_id}
          rows={formattedItems}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </DataGridContainer>
    </Box>
  );
};

export default Efficiencies;
