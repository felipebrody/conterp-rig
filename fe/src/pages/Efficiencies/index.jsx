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
      flex: 0.3,
      cellClassName: "name-column--cell",
      align: "center",
      headerAlign: "center",
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
      field: "dtm_hours",
      headerName: "Hora DTM",
      flex: 0.5,
      headerAlign: "center",
      type: "number",
      align: "center",
      renderCell: ({ row: { dtm_hours } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> {dtm_hours}Hrs</Typography>
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
            <Typography> {efficiency}%</Typography>
          </Box>
        );
      },
    },
    {
      field: "id",
      headerAlign: "center",
      headerName: "Detalhes",
      flex: 0.5,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="35%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Link to={`/user/list-efficiencies/details/${id}`}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSeeDetailsClick(id)}
              >
                <Typography color="#fff"> Ver Mais</Typography>
              </Button>
            </Link>
          </Box>
        );
      },
    },
  ];

  const handleSeeDetailsClick = (id) => {
    console.log(id);
  };

  const user = useSelector((state) => state.user);
  console.log("Efficiencies from Database ===>", efficiencies);
  const formattedItems = useFormatEfficienciesArray(efficiencies);

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  function getTotalHoursInMonth() {
    const currentDate = new Date();
    const lastDayOfMonth = currentDate.getDate() - 1;
    const totalHours = lastDayOfMonth * 24;

    return totalHours;
  }

  const totalHoursInMonth = getTotalHoursInMonth();
  console.log(totalHoursInMonth);

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
          getRowId={(row) => row.id}
          rows={formattedItems}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </DataGridContainer>
    </Box>
  );
};

export default Efficiencies;
