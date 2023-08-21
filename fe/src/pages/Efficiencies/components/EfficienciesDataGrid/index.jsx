import {useTheme} from "@emotion/react";
import {GridToolbar, DataGrid} from "@mui/x-data-grid";
import {DataGridContainer} from "./styles";
import {Box, Typography, Button} from "@mui/material";
import {CheckCircleOutlineTwoTone} from "@mui/icons-material";
import {Link} from "react-router-dom";

export const EfficienciesDataGrid = ({formattedItems}) => {
  const columns = [
    {
      field: "user_name",
      headerName: "Usuário",
      flex: 0.5,
      headerAlign: "center",
      align: "center",

      /* renderCell: ({ row: { user_name } }) => {
            return (
              <Box
                width="100%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor="#1c7b7b"
              >
                <Typography> {user_name}</Typography>
              </Box>
            );
          }, */
    },
    {
      field: "rig_name",
      headerName: "Sonda",
      flex: 0.5,
      headerAlign: "center",
      align: "center",

      renderCell: ({row: {rig_name}}) => {
        return (
          <Box
            width="100%"
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
      renderCell: ({row: {available_hours}}) => {
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
      headerName: "Reparo",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell: ({row: {hasRepairHours}}) => {
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
      headerName: "Glosa",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell: ({row: {hasGlossHours}}) => {
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
      flex: 0.5,
      renderCell: ({row: {efficiency}}) => {
        return (
          <Box
            width="70%"
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
      renderCell: ({row: {efficiency_id}}) => {
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

  const theme = useTheme();

  return (
    <DataGridContainer theme={theme}>
      <DataGrid
        getRowId={(row) => row.efficiency_id}
        rows={formattedItems}
        columns={columns}
        components={{Toolbar: GridToolbar}}
      />
    </DataGridContainer>
  );
};
